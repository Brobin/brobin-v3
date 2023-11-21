import {
  INaturalistTaxon,
  INaturalistTaxonDetail,
  Rank,
  RankLevel,
  Taxon,
  UserTaxon,
} from "@brobin/types/inaturalist";
import { TaxiAlert } from "@mui/icons-material";
import { objectShallowCompare } from "@mui/x-data-grid/hooks/utils/useGridSelector";
import { isNumber } from "@mui/x-data-grid/internals";

function get<T>(url: string, array?: boolean): Promise<T | null> {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (array) {
        return json["results"] || [];
      }
      return json["results"][0] || null;
    });
}

export async function searchTaxonomy(search: string): Promise<Taxon[]> {
  return get<INaturalistTaxon>(
    `https://api.inaturalist.org/v1/taxa?q=${search}&rank=${Rank.Species}&rank=${Rank.SubSpecies}`
  ).then(async (taxon) => {
    if (taxon) {
      const detail = await get<INaturalistTaxonDetail>(
        `https://api.inaturalist.org/v1/taxa/${taxon.id}`
      );
      const taxonomy = detail?.ancestors || [];
      return taxonomy
        .sort((a, b) => b.rank_level - a.rank_level)
        .filter((t) => t.rank_level % 10 === 0 || t.rank_level < 10)
        .concat([taxon])
        .map(({ id, rank, name, wikipedia_url, preferred_common_name }) => ({
          id,
          rank,
          name,
          wikipedia_url,
          preferred_common_name: preferred_common_name || null,
        }));
    }
    return [];
  });
}

export async function getUserTaxonomy(
  user_id: string,
  username: string
): Promise<UserTaxon[]> {
  const metadata = await getUserTaxonomyNames(username);
  return get<UserTaxon[]>(
    `https://api.inaturalist.org/v1/observations/taxonomy?user_id=${user_id}`,
    true
  )
    .then((taxa: UserTaxon[] | null) => taxa || [])
    .then((taxa: UserTaxon[]) =>
      taxa.map(
        ({ id, name, rank, rank_level, parent_id, descendant_obs_count }) => ({
          id,
          name,
          rank,
          rank_level,
          parent_id,
          descendant_obs_count,
          species_count: 0,
          common_name: metadata[id] || null,
        })
      )
    )
    .then((taxa: UserTaxon[]) => {
      taxa.forEach((taxon) => {
        taxon.children = taxa.filter(({ parent_id }) => parent_id === taxon.id);
      });
      taxa.forEach((taxon) => {
        taxon.species_count = taxon.children?.length ? 0 : 1;
      });
      taxa.sort((a, b) => b.rank_level - a.rank_level);

      function speciesCount(rank_level: RankLevel) {
        taxa
          .filter((t) => t.rank_level === rank_level)
          .forEach((t) => {
            t.species_count = taxa
              .filter(({ parent_id }) => parent_id === t.id)
              .reduce((a, b) => a + b.species_count, 0);
          });
      }

      Object.keys(RankLevel)
        .map((v) => Number(v))
        .filter((v) => isNumber(v) && v > RankLevel.Species)
        .forEach((rank) => speciesCount(rank));

      return taxa.filter(({ rank_level }) => rank_level === RankLevel.Kingdom);
    });
}

export async function getUserTaxonomyNames(username: string): Promise<any> {
  return fetch(
    `https://api.inaturalist.org/v1/taxa/lifelist_metadata?observed_by_user_id=${username}&locale=en`
  )
    .then((res) => res.json())
    .then((json) => json["results"])
    .then((taxa: { id: number; preferred_common_name: string }[]) => {
      const map: { [key: number]: string } = {};
      taxa.map(
        ({ id, preferred_common_name }) => (map[id] = preferred_common_name)
      );
      return map;
    });
}
