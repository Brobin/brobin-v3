import { Autocomplete, Card, Grid, Typography } from "@mui/joy";
import { createFilterOptions } from "@mui/joy/Autocomplete";

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

// match on common or scientific name
const filterOptions = createFilterOptions<Taxonomy>({
  stringify: (bird) => `${bird.comName} ${bird.sciName}`,
});

export default function BirdsOfNebraskaBySpecies({ birds, counties }: Props) {
  const [species, setSpecies] = useQueryParam("species");
  const navigateToCounty = useCountyNavigation(counties);

  const countySet = React.useMemo(() => {
    if (species) {
      return new Set(
        counties.filter((c) => c.species.includes(species)).map((c) => c.name),
      );
    }
    return new Set<string>();
  }, [counties, species]);

  const selectedSpecies = React.useMemo(() => {
    return birds.find((b) => b.speciesCode === species);
  }, [birds, species]);

  return (
    <Page
      title={
        selectedSpecies
          ? `${selectedSpecies.comName} by county in Nebraska`
          : "Birds of Nebraska"
      }
      siteTitle={"Birds of Nebraska"}
      description={
        selectedSpecies
          ? `Map of the occurence of in Nebraska by ${selectedSpecies.comName} by county.`
          : "Map of species occurence of in Nebraska by county."
      }
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={12}>
          <Typography level="h2">Birds of Nebraska by Species</Typography>
        </Grid>
        <Grid xs={12} md={3}>
          <Autocomplete
            placeholder="Search for a species"
            options={birds}
            value={selectedSpecies ?? null}
            getOptionLabel={(bird) => bird.comName}
            isOptionEqualToValue={(a, b) => a.speciesCode === b.speciesCode}
            filterOptions={filterOptions}
            onChange={(_, bird) => setSpecies(bird?.speciesCode ?? null)}
          />
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
