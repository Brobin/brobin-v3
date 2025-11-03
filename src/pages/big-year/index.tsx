import DollarsSpent from "@brobin/components/big-year/ charts/DollarsSpent";
import MilesTraveled from "@brobin/components/big-year/ charts/MilesTraveled";
import SpeciesByMonth from "@brobin/components/big-year/ charts/SpeciesByMonth";
import TotalSpecies from "@brobin/components/big-year/ charts/TotalSpecies";
import Page from "@brobin/components/Page";
import { Bird, Month } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import { Check } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/joy";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import months from "../../../data/big-year/months.json";

dayjs.extend(weekOfYear);

interface Props {
  birds: Bird[];
  series: { date: string; total: number; new: number }[];
  months: Month[];
}

export default function BigYear({ birds, series, months }: Props) {
  const lifers = birds.filter((b) => b.lifeBird);
  return (
    <Page title="Nebraska Big Year 2025">
      <Typography level="h1">Nebraska Big Year 2025</Typography>
      <p>
        I&apos;m spending 2025 finding as many birds as I can in the state of
        Nebraska! The record is 347, and my goal is 350!
      </p>
      <br />
      <Grid container spacing={2}>
        <ButtonGroup variant="outlined">
          <Button
            href="/blog/2025/02/nebraska-big-year-january-recap"
            component="a"
          >
            Jan
          </Button>
          <Button
            href="/blog/2025/03/nebraska-big-year-february-recap"
            component="a"
          >
            Feb
          </Button>
          <Button
            href="/blog/2025/04/nebraska-big-year-march-recap"
            component="a"
          >
            Mar
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button
            href="/blog/2025/04/nebraska-big-year-april-recap"
            component="a"
          >
            Apr
          </Button>
          <Button
            href="/blog/2025/06/nebraska-big-year-may-recap"
            component="a"
          >
            May
          </Button>
          <Button
            href="/blog/2025/07/nebraska-big-year-june-recap"
            component="a"
          >
            Jun
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button
            href="/blog/2025/08/nebraska-big-year-july-recap"
            component="a"
          >
            Jul
          </Button>
          <Button
            href="/blog/2025/09/nebraska-big-year-august-recap"
            component="a"
          >
            Aug
          </Button>
          <Button
            href="/blog/2025/10/nebraska-big-year-september-recap"
            component="a"
          >
            Sep
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined">
          <Button
            href="/blog/2025/11/nebraska-big-year-october-recap"
            component="a"
          >
            Oct
          </Button>
        </ButtonGroup>
        <Button href="/big-year/map" component="a" style={{ marginLeft: 20 }}>
          Map
        </Button>
      </Grid>

      <br />
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card variant="plain">
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4}>
                  <Typography
                    level="h4"
                    textAlign="center"
                    textColor={"#9e9e9e"}
                  >
                    Latest Bird
                  </Typography>
                  <Typography level="h3" fontSize={30} textAlign="center">
                    {birds[0].name}
                  </Typography>
                  <Typography fontSize={16} textAlign="center">
                    {dayjs(birds[0].date).format("MMM DD")}
                  </Typography>
                </Grid>

                <Grid xs={12} sm={12} md={4}>
                  <Typography level="h2" fontSize={75} textAlign="center">
                    <Link
                      href={`https://ebird.org/top100?region=Nebraska&locInfo.regionCode=US-NE&year=2025&rankedBy=spp`}
                      target="_blank"
                      underline="always"
                      color="success"
                    >
                      {birds.length}
                    </Link>{" "}
                    <span style={{ color: "#9e9e9e" }}>/ 350</span>
                  </Typography>
                </Grid>

                <Grid xs={12} sm={12} md={4}>
                  <Typography
                    level="h4"
                    textAlign="center"
                    textColor={"#9e9e9e"}
                  >
                    Latest Lifer
                  </Typography>
                  <Typography level="h3" fontSize={30} textAlign="center">
                    {lifers[0].name}
                  </Typography>
                  <Typography fontSize={16} textAlign="center">
                    {dayjs(lifers[0].date).format("MMM DD")}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Total Species
              </Typography>
              <TotalSpecies series={series} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Species seen each Month
              </Typography>
              <SpeciesByMonth months={months} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Miles Traveled
              </Typography>
              <MilesTraveled months={months} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Dollars Spent
              </Typography>
              <DollarsSpent months={months} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={8}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Year List
              </Typography>
              <DataGrid
                rows={birds}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 50,
                    },
                  },
                }}
                pageSizeOptions={[]}
                columns={[
                  { field: "id", headerName: "#", width: 40 },
                  {
                    field: "name",
                    headerName: "Species",
                    width: 250,
                    valueGetter({ value, row }) {
                      return { name: value, photoId: row.photoId };
                    },
                    renderCell({ value }) {
                      if (value.photoId) {
                        return (
                          <Link
                            href={`https://macaulaylibrary.org/asset/${value.photoId}`}
                            underline="always"
                            target="_blank"
                          >
                            {value.name}
                          </Link>
                        );
                      }
                      return value.name;
                    },
                  },
                  {
                    field: "location",
                    headerName: "Location",
                    sortable: false,
                  },
                  {
                    field: "date",
                    headerName: "Date",
                    width: 70,
                    valueFormatter: ({ value }) =>
                      dayjs(value).format("MMM DD"),
                  },
                  {
                    field: "lifeBird",
                    headerName: `${
                      birds.filter((b) => b.lifeBird).length
                    } Lifers`,
                    width: 85,
                    renderCell({ value }) {
                      if (value) {
                        return (
                          <Chip
                            icon={<Check />}
                            label="Lifer"
                            size="small"
                            color="success"
                            sx={{ marginRight: 1 }}
                          />
                        );
                      }
                      return "";
                    },
                  },
                  {
                    field: "stateBird",
                    headerName: `${
                      birds.filter((b) => b.stateBird).length
                    } State Birds`,
                    width: 120,
                    renderCell({ value }) {
                      if (value) {
                        return (
                          <Chip
                            icon={<Check />}
                            label="State Bird"
                            size="small"
                            color="info"
                            sx={{ marginRight: 1 }}
                          />
                        );
                      }
                      return "";
                    },
                  },
                ]}
                rowHeight={38}
              />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Birds added each week
              </Typography>
              <DataGrid
                rows={series
                  .map((s, id) => ({ ...s, id }))
                  .filter((s) => s.new > 0)
                  .reverse()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 52,
                    },
                  },
                }}
                pageSizeOptions={[]}
                columns={[
                  {
                    field: "date",
                    headerName: "Date",
                    width: 150,
                    valueFormatter: ({ value }) => {
                      return `${dayjs(value).format("MMM DD")} - ${dayjs(value)
                        .day(6)
                        .format("MMM DD")}`;
                    },
                  },
                  {
                    field: "new",
                    headerName: "New",
                    width: 75,
                  },
                  { field: "total", headerName: "Total", width: 75 },
                ]}
                rowHeight={38}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

export async function getStaticProps() {
  const birds = await getBirdList();

  const series: { date: string; total: number; new: number }[] = [];

  let currentDay = dayjs().set("month", 0).set("date", 1);
  let today = dayjs();

  let week = currentDay.week();

  while (currentDay <= dayjs("2026-01-01") && currentDay <= today) {
    series.push({
      date: currentDay.format("DD MMM YYYY"),
      total: birds.filter((b) => dayjs(b.date).week() <= week).length,
      new: birds.filter((b) => dayjs(b.date).week() === week).length,
    });
    currentDay = currentDay.week(week + 1).day(0);
    week = currentDay.week();
  }

  return {
    props: { birds, series, months },
    revalidate: 1,
  };
}
