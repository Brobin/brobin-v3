import {
  INaturalistTaxon,
  INaturalistTaxonDetail,
  Rank,
  Taxon,
} from "@brobin/types/inaturalist";

function get<T>(url: string): Promise<T | null> {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json["results"][0] || null);
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
