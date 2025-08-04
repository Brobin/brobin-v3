import Page from "@brobin/components/Page";
import { Bird } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/joy";
import { LineChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

interface Props {
  birds: Bird[];
  series: { date: string; total: number; new: number }[];
}

export default function BigYear({ birds, series }: Props) {
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
          <Button
            href="/blog/2025/08/nebraska-big-year-july-recap"
            component="a"
          >
            Jul
          </Button>
        </ButtonGroup>
        <Button href="/big-year/map" component="a" style={{ marginLeft: 20 }}>
          Map
        </Button>
      </Grid>

      <br />
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={4}>
            <Card variant="plain">
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
              <hr style={{ width: "100%" }} />
              <Typography level="h4" textAlign="center" textColor={"#9e9e9e"}>
                Latest Bird
              </Typography>
              <Typography level="h3" fontSize={30} textAlign="center">
                {birds[0].name}
              </Typography>
              <span style={{ textAlign: "center" }}>
                {dayjs(birds[0].date).format("MMM DD")}
              </span>
              <hr style={{ width: "100%" }} />
              <Typography level="h4" textAlign="center" textColor={"#9e9e9e"}>
                First Bird
              </Typography>
              <Typography level="h3" fontSize={30} textAlign="center">
                {birds[birds.length - 1].name}
              </Typography>
              <span style={{ textAlign: "center" }}>
                {dayjs(birds[birds.length - 1].date).format("MMM DD")}
              </span>
            </Card>
            <br />
          </Grid>
          <Grid xs={12} sm={12} md={8}>
            <Card variant="plain">
              <Typography level="h3" fontSize={30} textAlign="center">
                Total Species
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: series.map((s) => dayjs(s.date).toDate()),
                    label: "Week",
                    scaleType: "point",
                    min: dayjs("01 Jan 2024").toDate(),
                    max: dayjs().toDate(),
                    valueFormatter: (date) => {
                      return `${dayjs(date).format("MMM DD")} - ${dayjs(date)
                        .day(6)
                        .format("MMM DD")}`;
                    },
                  },
                ]}
                yAxis={[{ label: "Species", min: 0 }]}
                series={[
                  {
                    data: series.map((s) => s.total),
                    showMark: () => true,
                  },
                ]}
                height={400}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box paddingY={2}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={8}>
            <DataGrid
              rows={birds}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
              pageSizeOptions={[]}
              columns={[
                { field: "id", headerName: "#", width: 75 },
                { field: "name", headerName: "Species", width: 250 },
                {
                  field: "location",
                  headerName: "Location",
                  width: 300,
                  sortable: false,
                },
                {
                  field: "date",
                  headerName: "Date",
                  valueFormatter: ({ value }) => dayjs(value).format("MMM DD"),
                },
              ]}
              rowHeight={38}
            />
          </Grid>
          <Grid xs={12} sm={12} md={4}>
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
    props: { birds, series },
    revalidate: 1,
  };
}
