import CumulativeFishLineChart from "@brobin/components/fishing/CumulativeFishLineChart";
import FishScatterChart from "@brobin/components/fishing/FishScatterChart";
import SpeciesTrendLineChart from "@brobin/components/fishing/SpeciesTrendLineChart";
import TotalFishBarChart from "@brobin/components/fishing/TotalFishBarChart";
import { Fish, Year } from "@brobin/types/fishing";
import { getFishData, getYearsData } from "@brobin/utils/fishing";
import { Box, Button, ButtonGroup, Card, Grid, Typography } from "@mui/joy";

interface Props {
  years: Year[];
  fish: Fish[];
}

export default function Fishing({ years, fish }: Props) {
  return (
    <>
      <Typography level="h1">Family Fishing Trip</Typography>
      <Box paddingY={2}>
        <ButtonGroup>
          {years.map((year) => (
            <Button
              key={year.year}
              variant="soft"
              color="primary"
              component="a"
              href={`/fishing/${year.year}`}
            >
              {year.year}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Total fish caught
              </Typography>
              <TotalFishBarChart years={years} />
            </Card>
          </Grid>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Cumulative fish caught
              </Typography>
              <CumulativeFishLineChart years={years} />
            </Card>
          </Grid>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Species trend
              </Typography>
              <SpeciesTrendLineChart years={years} />
            </Card>
          </Grid>
          <Grid sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Fish size
              </Typography>
              <FishScatterChart fish={fish} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      years: getYearsData(),
      fish: getFishData(),
    },
  };
}
