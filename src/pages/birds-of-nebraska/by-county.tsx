import { Autocomplete, Card, Grid, Typography } from "@mui/joy";
import React from "react";

import DataDisclaimer from "@brobin/components/ebird/DataDisclaimer";
import SpeciesChecklist from "@brobin/components/ebird/SpeciesChecklist";
import Page from "@brobin/components/Page";
import { useQueryParam } from "@brobin/hooks/useQueryParam";
import { RegionWithSpecies, Taxonomy } from "@brobin/types/ebird";
import { getBirds, getCountyLists } from "@brobin/utils/ebird";

interface Props {
  birds: Taxonomy[];
  counties: RegionWithSpecies[];
}

export default function BirdsOfNebraskaByCounty({ birds, counties }: Props) {
  const [code, setCode] = useQueryParam("county");

  const sortedCounties = React.useMemo(
    () => [...counties].sort((a, b) => a.name.localeCompare(b.name)),
    [counties],
  );

  const selectedCounty = React.useMemo(
    () => counties.find((c) => c.code === code),
    [counties, code],
  );

  const allBirds = React.useMemo(
    () => [...birds].sort((a, b) => a.taxonOrder - b.taxonOrder),
    [birds],
  );

  const seen = React.useMemo(
    () => new Set(selectedCounty?.species),
    [selectedCounty],
  );

  const seenCount = React.useMemo(
    () => allBirds.filter((bird) => seen.has(bird.speciesCode)).length,
    [allBirds, seen],
  );

  return (
    <Page title="Birds of Nebraska" description="Birds of Nebraska by county">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="h2">Birds of Nebraska by County</Typography>
        </Grid>
        <Grid xs={12} md={3}>
          <Autocomplete
            placeholder="Search for a county"
            options={sortedCounties}
            value={selectedCounty ?? null}
            getOptionLabel={(county) => county.name}
            isOptionEqualToValue={(a, b) => a.code === b.code}
            onChange={(_, county) => setCode(county?.code ?? null)}
          />
          <br />

          {selectedCounty && (
            <Card>
              <Typography level="h3">{selectedCounty.name} County</Typography>
              <p>
                <b>{seenCount}</b> / {birds.length} species (
                {Math.round((seenCount / birds.length) * 100)}%)
              </p>
              <Typography
                level="body-xs"
                component={"a"}
                href={`https://ebird.org/region/${selectedCounty.code}`}
                target="_blank"
              >
                <i>Data from eBird</i>
              </Typography>
            </Card>
          )}
        </Grid>
        {selectedCounty && (
          <Grid xs={12} md={9}>
            <Card variant="plain">
              <SpeciesChecklist birds={allBirds} seen={seen} />
            </Card>
          </Grid>
        )}
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
