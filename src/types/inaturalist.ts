export enum Rank {
  Kingdom = "kingdom",
  Phylum = "phylum",
  Subphylum = "subphylum",
  Superclass = "superclass",
  Class = "class",
  SubClass = "subclass",
  Superorder = "superorder",
  Order = "order",
  Suborder = "suborder",
  Infraorder = "infraorder",
  Parvorder = "parvorder",
  ZooSection = "zoosection",
  ZooSubsection = "zoosubsection",
  Superfamily = "superfamily",
  Epifamily = "epifamily",
  Family = "family",
  Subfamily = "subfamily",
  SuperTribe = "supertribe",
  Tribe = "tribe",
  SubTribe = "subtribe",
  Genus = "genus",
  GenusHybrid = "genushybrid",
  Subgenus = "subgenus",
  Section = "section",
  Complex = "complex",
  Species = "species",
  SpeciesHybrid = "specieshybrid",
  SubSpecies = "subspecies",
}

export enum RankLevel {
  Kingdom = 70,
  Phylum = 60,
  Subphylum = 57,
  Superclass = 53,
  Class = 50,
  Subclass = 47,
  Infraclass = 45,
  Superorder = 43,
  Order = 40,
  Suborder = 37,
  Infraorder = 35,
  Parvorder = 34.5,
  ZooSection = 34,
  ZooSubsection = 33.5,
  Superfamily = 32,
  Epifamily = 32,
  Family = 30,
  Subfamily = 27,
  Supertribe = 26,
  Tribe = 25,
  SubTribe = 24,
  Genus = 20,
  Subgenus = 15,
  Section = 13,
  Complex = 11,
  Species = 10,
  SubSpecies = 5,
}

export type INaturalistTaxon = {
  id: number;
  rank: Rank;
  rank_level: RankLevel;
  iconic_taxon_id: number;
  ancestor_ids: number[];
  is_active: boolean;
  name: string;
  parent_id: number;
  exitinct: boolean;
  default_photo: {
    id: number;
    license_code: string;
    attribution: string;
    url: string;
    original_dimensions: any;
    square_url: string;
    medium_url: string;
  };
  taxon_changes_count: number;
  taxon_schemes_count: number;
  observations_count: number;
  flag_counts: {
    resolved: number;
    unresolved: number;
  };
  current_synonymous_taxon_ids: number[] | null;
  atlas_id: number | null;
  complete_species_count: number;
  wikipedia_url: string;
  complete_rank: Rank;
  iconic_taxon_name: string;
  preferred_common_name?: string | null;
};

export type INaturalistTaxonDetail = INaturalistTaxon & {
  ancestors: INaturalistTaxon[];
};

export type Taxon = Pick<
  INaturalistTaxon,
  "id" | "rank" | "name" | "wikipedia_url" | "preferred_common_name"
>;

export type UserTaxon = Pick<
  INaturalistTaxon,
  "id" | "name" | "rank" | "rank_level" | "parent_id"
> & {
  descendant_obs_count: number;
  species_count: number;
  children?: UserTaxon[];
  common_name?: string | null;
};
