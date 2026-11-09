import fs from "node:fs/promises";
import path from "node:path";

import {
  Region,
  RegionWithSpecies,
  Taxonomy,
  TaxonomyWithCount,
} from "@brobin/types/ebird";
import { exclude } from "../../data/ebird/exclude";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CACHE_DIR = path.join(process.cwd(), "data", "ebird");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const filePath = path.join(CACHE_DIR, `${key}.json`);

  try {
    const stat = await fs.stat(filePath);
    if (Date.now() - stat.mtimeMs < CACHE_TTL_MS) {
      return JSON.parse(await fs.readFile(filePath, "utf-8"));
    }
  } catch {
    // no cache file yet, or it's unreadable — fall through to fetch
  }

  const data = await fetcher();
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data));
  return data;
}

async function get<T>(url: string): Promise<T> {
  const headers = { "X-eBirdApiToken": process.env.EBIRD_API_TOKEN! };

  let res = await fetch(url, { headers });
  while (res.status === 429) {
    await sleep(10000);
    res = await fetch(url, { headers });
  }
  return res.json();
}

export async function getCountyLists(
  state: string,
): Promise<RegionWithSpecies[]> {
  const counties = await get<Region[]>(
    `https://api.ebird.org/v2/ref/region/list/subnational2/${state}`,
  );

  const results: RegionWithSpecies[] = [];
  for (const county of counties) {
    const species = await getList(county.code);
    results.push({ ...county, species });
  }
  return results;
}

export async function getList(region: string) {
  const species = await cached(`list-${region}`, () =>
    get<string[]>(`https://api.ebird.org/v2/product/spplist/${region}`).then(
      (species) => species.filter((sp) => sp[0] !== "x"), // "x" indicate hybrids
    ),
  );
  return species.filter((sp) => !exclude[sp]?.has(region));
}

const EXOTIC = new Set([
  "Bar-headed Goose",
  "Graylag Goose",
  "Swan Goose",
  "Whooper Swan",
  "Egyptian Goose",
  "Ruddy Shelduck",
  "Muscovy Duck",
  "Mandarin Duck",
  "Helmeted Guineafowl",
  "Indian Peafowl",
  "Red Junglefowl",
  "Chukar",
  "African Collared-Dove",
  "Cockatiel",
  "Budgerigar",
  "Rosy-faced Lovebird",
  "Monk Parakeet",
  "Northern Red Bishop",
]);

/** Non-exotic species that have been observed in the given region. */
export async function getBirds(
  region: string,
  counties: RegionWithSpecies[] = [],
): Promise<TaxonomyWithCount[]> {
  const list = new Set(await getList(region));
  const taxonomy = await getTaxonomy();

  // how many of the given counties have reported each species
  const countyCounts = new Map<string, number>();
  for (const county of counties) {
    for (const sp of county.species) {
      countyCounts.set(sp, (countyCounts.get(sp) ?? 0) + 1);
    }
  }

  return taxonomy
    .filter((taxon) => list.has(taxon.speciesCode) && !EXOTIC.has(taxon.comName))
    .map((taxon) => ({
      ...taxon,
      countyCount: countyCounts.get(taxon.speciesCode) ?? 0,
    }));
}

export async function getTaxonomy() {
  return get<Taxonomy[]>(
    `https://api.ebird.org/v2/ref/taxonomy/ebird?cat=species&fmt=json`,
  );
}
