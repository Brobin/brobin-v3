import Page from "@brobin/components/Page";
import FishScatterChart from "@brobin/components/fishing/FishScatterChart";
import YearBarChart from "@brobin/components/fishing/YearBarChart";
import YearPieChart from "@brobin/components/fishing/YearPieChart";
import { Year, YearParams } from "@brobin/types/fishing";
import { getYearData, getYears } from "@brobin/utils/fishing";
import { Box, Card, Grid, Typography } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";

interface Props {
  year: Year;
}

export default function FishingYear({ year }: Props) {
  return (
    <Page title={`${year.year} Fishing`}>
      <Typography level="h1">{year.year} Family Fishing Trip</Typography>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Total species caught
              </Typography>
              <YearPieChart year={year} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Species caught per day
              </Typography>
              <YearBarChart year={year} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Fish size
              </Typography>
              <FishScatterChart fish={year.fish} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <DataGrid
              rows={year.days.map((day, index) => ({ ...day, id: index }))}
              columns={[
                { field: "day", headerName: "Day" },
                { field: "bass", headerName: "Bass" },
                { field: "northern", headerName: "Northern" },
                { field: "walleye", headerName: "Walleye" },
              ]}
              sx={{
                backgroundColor: "var(--joy-palette-background-surface)",
                border: "none",
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              rowSelection={false}
              hideFooter
              disableColumnMenu
            />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: getYears().map((year) => `/fishing/${year}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { year } }: YearParams) {
  return {
    props: {
      year: getYearData(year),
    },
  };
}
