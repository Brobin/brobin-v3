import { Card, Grid, Option, Select, Typography } from "@mui/joy";

import DataDisclaimer from "@brobin/components/ebird/DataDisclaimer";
import { DataMap } from "@brobin/components/ebird/DataMap";
import Page from "@brobin/components/Page";
import { useCountyNavigation } from "@brobin/hooks/useCountyNavigation";
import { useQueryParam } from "@brobin/hooks/useQueryParam";
import { RegionWithSpecies, Taxonomy } from "@brobin/types/ebird";
import { getBirds, getCountyLists } from "@brobin/utils/ebird";
import React from "react";

interface Props {
  birds: Taxonomy[];
  counties: RegionWithSpecies[];
}

export default function BirdsOfNebraskaBySpecies({ birds, counties }: Props) {
  const [species, setSpecies] = useQueryParam("species");
  const navigateToCounty = useCountyNavigation(counties);

  const countySet = React.useMemo(() => {
    if (species) {
      return new Set(
        counties
          .filter((c) => c.species.includes(species))
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
          <Typography level="h2">Birds of Nebraska by Species</Typography>
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
<DataMap counties={countySet} onCountyClick={navigateToCounty} />
        </Grid>
        <DataDisclaimer />
      </Grid>
    </Page>
  );
}

export async function getStaticProps() {
  const counties = await getCountyLists("US-NE");
  const birds = await getBirds("US-NE");

  return { props: { birds, counties } };
}
