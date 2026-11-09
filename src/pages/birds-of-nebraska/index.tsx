import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

import DataDisclaimer from "@brobin/components/ebird/DataDisclaimer";
import { DataMap } from "@brobin/components/ebird/DataMap";
import Page from "@brobin/components/Page";
import { useCountyNavigation } from "@brobin/hooks/useCountyNavigation";
import { RegionWithSpecies, Taxonomy } from "@brobin/types/ebird";
import { getBirds, getCountyLists } from "@brobin/utils/ebird";
import { countyUrl, speciesUrl } from "@brobin/utils/routes";

interface Props {
  birds: Taxonomy[];
  counties: RegionWithSpecies[];
}

const countyColumns: GridColDef[] = [
  { field: "name", headerName: "County", flex: 1 },
  { field: "count", headerName: "Species", type: "number", width: 100 },
];

const speciesColumns: GridColDef[] = [
  { field: "name", headerName: "Species", flex: 1 },
  { field: "sciName", headerName: "Scientific Name", flex: 1 },
  { field: "count", headerName: "Counties", type: "number", width: 100 },
];

function SearchToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

function SpeciesToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton sx={{ float: "right", marginLeft: "auto" }} />
    </GridToolbarContainer>
  );
}

export default function BirdsOfNebraska({ birds, counties }: Props) {
  const router = useRouter();
  const navigateToCounty = useCountyNavigation(counties);

  const countyRows = React.useMemo(() => {
    const codes = new Set(birds.map((b) => b.speciesCode));
    return counties
      .map((county) => ({
        id: county.code,
        name: county.name,
        count: county.species.filter((code) => codes.has(code)).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [birds, counties]);

  const countyCounts = React.useMemo(
    () => Object.fromEntries(countyRows.map((c) => [c.name, c.count])),
    [countyRows],
  );

  const speciesRows = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const county of counties) {
      for (const code of county.species) {
        counts.set(code, (counts.get(code) ?? 0) + 1);
      }
    }
    return [...birds]
      .sort((a, b) => a.taxonOrder - b.taxonOrder)
      .map((bird) => ({
        id: bird.speciesCode,
        name: bird.comName,
        sciName: bird.sciName,
        count: counts.get(bird.speciesCode) ?? 0,
      }));
  }, [birds, counties]);

  return (
    <Page
      title="Birds of Nebraska"
      description="Checklists and visualizations by county and by species for all birds seen in the state of Nebraska. All data pulled from eBird."
    >
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="h2">Birds of Nebraska</Typography>
          <Typography level="body-md">
            {birds.length} species &middot;{" "}
            {countyRows
              .reduce((total, c) => total + c.count, 0)
              .toLocaleString("en-US")}{" "}
            county ticks
          </Typography>
        </Grid>
        <Grid xs={12}>
          <DataMap counts={countyCounts} onCountyClick={navigateToCounty} />
        </Grid>
        <Grid xs={12} md={4}>
          <Card variant="plain">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography level="h3" fontSize={30}>
                Counties
              </Typography>
              <Button
                component={NextLink}
                href="/birds-of-nebraska/by-county"
                size="sm"
                variant="outlined"
              >
                View County Lists
              </Button>
            </Box>
            <Typography level="body-sm">
              <b>{countyRows.filter((c) => c.count > 200).length}</b> of{" "}
              {countyRows.length} counties have more than 200 species.
            </Typography>
            <DataGrid
              autoHeight
              rows={countyRows}
              columns={countyColumns}
              slots={{ toolbar: SearchToolbar }}
              onRowClick={(params) => router.push(countyUrl(`${params.id}`))}
              initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              pageSizeOptions={[]}
              rowHeight={38}
              sx={{ border: 0, "& .MuiDataGrid-row": { cursor: "pointer" } }}
            />
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card variant="plain">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography level="h3" fontSize={30}>
                Species
              </Typography>
              <Button
                component={NextLink}
                href="/birds-of-nebraska/by-species"
                size="sm"
                variant="outlined"
              >
                View Species Maps
              </Button>
            </Box>
            <Typography level="body-sm">
              <b>
                {speciesRows.filter((s) => s.count === counties.length).length}
              </b>{" "}
              of {speciesRows.length} species have been observed in all{" "}
              {counties.length} counties.
            </Typography>
            <DataGrid
              autoHeight
              rows={speciesRows}
              columns={speciesColumns}
              slots={{ toolbar: SpeciesToolbar }}
              onRowClick={(params) => router.push(speciesUrl(`${params.id}`))}
              initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
              }}
              pageSizeOptions={[]}
              rowHeight={38}
              sx={{ border: 0, "& .MuiDataGrid-row": { cursor: "pointer" } }}
            />
          </Card>
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
