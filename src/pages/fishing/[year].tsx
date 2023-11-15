import FishScatterChart from "@brobin/components/fishing/FishScatterChart";
import YearBarChart from "@brobin/components/fishing/YearBarChart";
import YearPieChart from "@brobin/components/fishing/YearPieChart";
import { Fish, Year, YearParams } from "@brobin/types/fishing";
import { getFishData, getYearData, getYears } from "@brobin/utils/fishing";
import { Box, Card, Grid, Typography } from "@mui/joy";

interface Props {
  year: Year;
  fish: Fish[];
}

export default function FishingYear({ year, fish }: Props) {
  return (
    <>
      <Typography level="h1">{year.year} Family Fishing Trip</Typography>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Species caught per day
              </Typography>
              <YearBarChart year={year} />
            </Card>
          </Grid>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Species caught
              </Typography>
              <YearPieChart year={year} />
            </Card>
          </Grid>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Fish Size
              </Typography>
              <FishScatterChart fish={fish} year={year.year} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
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
      fish: getFishData(),
    },
  };
}
