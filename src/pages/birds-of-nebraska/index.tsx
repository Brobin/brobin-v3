import { Card, Grid, Option, Select, Typography } from "@mui/joy";

import { DataMap } from "@brobin/components/ebird/DataMap";
import Page from "@brobin/components/Page";
import { RegionWithSpecies, Taxonomy } from "@brobin/types/ebird";
import { getCountyLists, getList, getTaxonomy } from "@brobin/utils/ebird";
import React from "react";

interface Props {
  birds: Taxonomy[];
  counties: RegionWithSpecies[];
}

export default function BirdsOfNebraska({ birds, counties }: Props) {
  const [species, setSpecies] = React.useState<string | null>();

  const countySet = React.useMemo(() => {
    if (species) {
      return new Set(
        counties
          .filter((c) => new Set(c.species).has(species))
          .map((c) => c.name),
      );
    }
    return new Set<string>();
  }, [counties, species]);

  const selectedSpecies = React.useMemo(() => {
    return birds.find((b) => b.speciesCode === species);
  }, [birds, species]);

  return (
    <Page title="Birds of Nebraska" description="Birds of Nebraska">
      <Grid container spacing={2}>
        <Grid xs={12} md={12}>
          <Typography level="h2">Birds of Nebraska by County</Typography>
        </Grid>
        <Grid xs={12} md={3}>
          <Select
            placeholder="Select a species"
            value={species}
            onChange={(e, value) => setSpecies(value)}
          >
            {birds.map((bird) => (
              <Option key={bird.speciesCode} value={bird.speciesCode}>
                {bird.comName}
              </Option>
            ))}
          </Select>
          <br />

          {selectedSpecies && (
            <Card>
              <Typography level="h3">{selectedSpecies.comName}</Typography>
              <i>{selectedSpecies.sciName}</i>
              <p>
                <b>{countySet.size}</b> / 93 counties (
                {Math.round((countySet.size / 93) * 100)}%)
              </p>
              <Typography
                level="body-xs"
                component={"a"}
                href={`https://ebird.org/species/${selectedSpecies.speciesCode}/US-NE`}
                target="_blank"
              >
                <i>Data from eBird</i>
              </Typography>
            </Card>
          )}
        </Grid>
        <Grid xs={12} md={9}>
          <DataMap counties={countySet} />
        </Grid>
      </Grid>
    </Page>
  );
}

export async function getStaticProps() {
  const list = new Set(await getList("US-NE"));
  const counties = await getCountyLists("US-NE");
  const taxonomy = await getTaxonomy();

  const exotic = new Set([
    "Bar-headed Goose",
    "Swan Goose",
    "Graylag Goose",
    "Whooper Swan",
    "Ruddy Shelduck",
    "Muscovy Duck",
    "Mandarin Duck",
    "Helmeted Guineafowl",
    "Indian Peafowl",
    "Chukar",
    "African Collared-Dove",
    "Cockatiel",
    "Budgerigar",
    "Rosy-faced Lovebird",
    "Monk Parakeet",
  ]);

  const birds = taxonomy.filter(
    (taxon) => list.has(taxon.speciesCode) && !exotic.has(taxon.comName),
  );

  return { props: { birds, counties } };
}
