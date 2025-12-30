import BirdTable from "@brobin/components/big-year/BirdTable";
import DollarsSpent from "@brobin/components/big-year/charts/DollarsSpent";
import MilesTraveled from "@brobin/components/big-year/charts/MilesTraveled";
import SpeciesByMonth from "@brobin/components/big-year/charts/SpeciesByMonth";
import TotalSpecies from "@brobin/components/big-year/charts/TotalSpecies";
import { DataMap } from "@brobin/components/big-year/DataMap";
import RecapButton from "@brobin/components/big-year/RecapButton";
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import { Bird, Month } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import { Box, Card, Grid, Link, Typography } from "@mui/joy";
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
  const lifeBirds = birds.filter((b) => b.lifeBird);
  const stateBirds = birds.filter((b) => b.stateBird);

  return (
    <Page
      title="Nebraska Big Year 2025"
      description="My 2025 attempt to see 350+ species of birds in the state of Nebraska. Stats, maps, blog posts and more!"
      image={{
        source:
          "https://cdn.download.ams.birds.cornell.edu/api/v2/asset/632650417/1200",
        width: 1200,
        height: 800,
      }}
    >
      <Typography level="h1">Nebraska Big Year 2025</Typography>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12}>
            <Card variant="plain">
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={4} order={{ xs: 2, sm: 2, md: 1 }}>
                  <Typography
                    level="h4"
                    textAlign="center"
                    textColor={"#9e9e9e"}
                  >
                    Life Birds
                  </Typography>
                  <Typography level="h3" fontSize={60} textAlign="center">
                    {lifeBirds.length}
                  </Typography>
                  <MobileDivider />
                </Grid>

                <Grid xs={12} sm={12} md={4} order={{ xs: 1, sm: 1, md: 2 }}>
                  <Typography
                    level="h4"
                    textAlign="center"
                    textColor={"#9e9e9e"}
                  >
                    Year Birds
                  </Typography>
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
                  <MobileDivider />
                </Grid>

                <Grid xs={12} sm={12} md={4} order={{ xs: 3 }}>
                  <Typography
                    level="h4"
                    textAlign="center"
                    textColor={"#9e9e9e"}
                  >
                    State Birds
                  </Typography>
                  <Typography level="h3" fontSize={60} textAlign="center">
                    {stateBirds.length}
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
              <Typography level="body-sm">
                The year took me all over the state! I ticked year birds in 34
                different counties, photographed 243 of them, and got recordings
                of 135. See the heatmap above to see which counties had the best
                birds.
              </Typography>
              <BirdTable birds={birds} />
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <Card variant="plain" sx={{ marginBottom: 2 }}>
              <Typography level="h3" fontSize={30}>
                Monthly Recaps
              </Typography>
              <Typography level="body-sm">
                Monthly blog posts containing stories, highlights, and photos
                from the month of birding.
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
                <RecapButton
                  name="Nov"
                  href="/blog/2025/12/nebraska-big-year-november-recap"
                />
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
                Species Accumulation
              </Typography>
              <TotalSpecies series={series} />
              <Typography level="body-sm">
                Fig 1. Total species acuumulation over the course of year by
                week. Notice the nice spike the first week of the year, and the
                bump in Apr-May as migration picked up.
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Species by Month
              </Typography>
              <SpeciesByMonth months={months} />
              <Typography level="body-sm">
                Fig 2. Total species observed each month, broken down by year
                birds, state birds, life birds, and other. Feb was the only
                month with less than 100 species.
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Mileage
              </Typography>
              <MilesTraveled months={months} />
              <Typography level="body-sm">
                Fig 3. Miles traveled per month. Many birding trips took me out
                west, which resulted in 1200+ mile weekends from Lincoln. The
                goal was to keep &quote;MPB&quote; under 75...
              </Typography>
            </Card>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Cost
              </Typography>
              <DollarsSpent months={months} />
              <Typography level="body-sm">
                Fig 4. Costs represented in the graph include hotels, camping
                fees, gasoine, and car maintenance. The goal was to keep
                &quote;CPB&quote; under $15.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

export function getStaticProps() {
  const birds = getBirdList();

  const series: { date: string; total: number; new: number }[] = [];

  let currentDay = dayjs().set("month", 0).set("date", 1);
  let today = dayjs();

  while (currentDay < dayjs("2026-01-01") && currentDay <= today) {
    const firstDayOfWeek = dayjs(currentDay).day(0);
    const lastDayOfWeek = dayjs(currentDay).day(6);

    series.push({
      date: currentDay.format("DD MMM YYYY"),
      total: birds.filter((b) => dayjs(b.date) < lastDayOfWeek).length,
      new: birds.filter(
        (b) => dayjs(b.date) >= firstDayOfWeek && dayjs(b.date) <= lastDayOfWeek
      ).length,
    });
    currentDay = currentDay.week(currentDay.week() + 1).day(0);
  }

  return {
    props: { birds, series, months },
    revalidate: 1,
  };
}
