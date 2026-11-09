export type Region = { code: string; name: string };

export type RegionWithSpecies = Region & { species: string[] };

export type TaxonomyWithCount = Taxonomy & {
  /** Number of counties in the state that have reported this species. */
  countyCount: number;
};

export type Taxonomy = {
  sciName: string;
  comName: string;
  speciesCode: string;
  category: string;
  taxonOrder: number;
  comNameCodes: string[];
  sciNameCodes: string[];
  order: string;
  familyCode: string;
  familyComName: string;
  familySciName: string;
  extinct?: boolean;
  extinctYear?: string;
};
