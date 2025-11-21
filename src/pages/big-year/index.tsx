import BirdTable from "@brobin/components/big-year/BirdTable";
import DollarsSpent from "@brobin/components/big-year/charts/DollarsSpent";
import MilesTraveled from "@brobin/components/big-year/charts/MilesTraveled";
import SpeciesByMonth from "@brobin/components/big-year/charts/SpeciesByMonth";
import TotalSpecies from "@brobin/components/big-year/charts/TotalSpecies";
import RecapButton from "@brobin/components/big-year/RecapButton";
import Page from "@brobin/components/Page";
import { Bird, Month } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import { Box, Button, Card, Grid, Link, Typography } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import months from "../../../data/big-year/months.json";
import { DataMap } from "@brobin/components/big-year/DataMap";

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

          <Grid xs={12} sm={12} md={12}>
            <DataMap />
          </Grid>
          <Grid xs={12} sm={12} md={8}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Year List
              </Typography>
              <BirdTable birds={birds} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Card variant="plain" sx={{ marginBottom: 2 }}>
              <Typography level="h3" fontSize={30}>
                Monthly Recaps
              </Typography>
              <Grid container spacing={1}>
                <RecapButton
                  name="Jan"
                  href="/blog/2025/02/nebraska-big-year-january-recap"
                />
                <RecapButton
                  name="Feb"
                  href="/blog/2025/03/nebraska-big-year-february-recap"
                />
                <RecapButton
                  name="Mar"
                  href="/blog/2025/04/nebraska-big-year-march-recap"
                />
                <RecapButton
                  name="Apr"
                  href="/blog/2025/04/nebraska-big-year-april-recap"
                />
                <RecapButton
                  name="May"
                  href="/blog/2025/06/nebraska-big-year-may-recap"
                />
                <RecapButton
                  name="Jun"
                  href="/blog/2025/07/nebraska-big-year-june-recap"
                />
                <RecapButton
                  name="Jul"
                  href="/blog/2025/08/nebraska-big-year-july-recap"
                />
                <RecapButton
                  name="Aug"
                  href="/blog/2025/09/nebraska-big-year-august-recap"
                />
                <RecapButton
                  name="Sep"
                  href="/blog/2025/10/nebraska-big-year-september-recap"
                />
                <RecapButton
                  name="Oct"
                  href="/blog/2025/11/nebraska-big-year-october-recap"
                />
                <RecapButton name="Nov" />
                <RecapButton name="Dec" />
              </Grid>
            </Card>

            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Species added each week
              </Typography>
              <DataGrid
                rows={series
                  .map((s, id) => ({ ...s, id }))
                  .filter((s) => s.new > 0)
                  .reverse()}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 19,
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
