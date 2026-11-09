import { Card, Grid, Option, Select, Typography } from "@mui/joy";
import { useRouter } from "next/router";
import React from "react";

import BirdTable from "@brobin/components/ebird/BirdTable";
import DataDisclaimer from "@brobin/components/ebird/DataDisclaimer";
import Page from "@brobin/components/Page";
import { useQueryParam } from "@brobin/hooks/useQueryParam";
import { RegionWithSpecies, Taxonomy } from "@brobin/types/ebird";
import { getBirds, getCountyLists } from "@brobin/utils/ebird";
import { speciesUrl } from "@brobin/utils/routes";

interface Props {
  birds: Taxonomy[];
  counties: RegionWithSpecies[];
}

export default function BirdsOfNebraskaByCounty({ birds, counties }: Props) {
  const router = useRouter();
  const [code, setCode] = useQueryParam("county");

  const sortedCounties = React.useMemo(
    () => [...counties].sort((a, b) => a.name.localeCompare(b.name)),
    [counties],
  );

  const selectedCounty = React.useMemo(
    () => counties.find((c) => c.code === code),
    [counties, code],
  );

  const rows = React.useMemo(() => {
    const speciesSet = new Set(selectedCounty?.species);
    return [...birds]
      .sort((a, b) => a.taxonOrder - b.taxonOrder)
      .filter((bird) => speciesSet.has(bird.speciesCode));
  }, [birds, selectedCounty]);

  return (
    <Page title="Birds of Nebraska" description="Birds of Nebraska by county">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="h2">Birds of Nebraska by County</Typography>
        </Grid>
        <Grid xs={12} md={3}>
          <Select
            placeholder="Select a county"
            value={code}
            onChange={(e, value) => setCode(value)}
          >
            {sortedCounties.map((county) => (
              <Option key={county.code} value={county.code}>
                {county.name}
              </Option>
            ))}
          </Select>
          <br />

          {selectedCounty && (
            <Card>
              <Typography level="h3">{selectedCounty.name} County</Typography>
              <p>
                <b>{rows.length}</b> / {birds.length} species (
                {Math.round((rows.length / birds.length) * 100)}%)
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
            <BirdTable
              birds={rows}
              onRowClick={(speciesCode) =>
                router.push(speciesUrl(speciesCode))
              }
            />
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
