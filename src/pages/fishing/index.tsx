import Page from "@brobin/components/Page";
import CumulativeFishLineChart from "@brobin/components/fishing/CumulativeFishLineChart";
import FishScatterChart from "@brobin/components/fishing/FishScatterChart";
import SpeciesTrendLineChart from "@brobin/components/fishing/SpeciesTrendLineChart";
import TotalFishBarChart from "@brobin/components/fishing/TotalFishBarChart";
import { Fish, Year } from "@brobin/types/fishing";
import { getFishData, getYearsData } from "@brobin/utils/fishing";
import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/joy";

interface Props {
  years: Year[];
  fish: Fish[];
}

export default function Fishing({ years, fish }: Props) {
  return (
    <Page title="Fishing">
      <Typography level="h1">Family Fishing Trip</Typography>
      <Box paddingY={2}>
        <List orientation="horizontal">
          {years.map((year) => (
            <ListItem key={year.year}>
              <ListItemButton
                variant="soft"
                color="primary"
                component="a"
                href={`/fishing/${year.year}`}
              >
                {year.year}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Total fish caught
              </Typography>
              <TotalFishBarChart years={years} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Cumulative fish caught
              </Typography>
              <CumulativeFishLineChart years={years} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Species trend
              </Typography>
              <SpeciesTrendLineChart years={years} />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" textAlign="center">
                Fish size
              </Typography>
              <FishScatterChart fish={fish} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
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
