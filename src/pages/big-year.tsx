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
        I'm spending 2025 finding as many birds as I can in the state of
        Nebraska! The current record is 347, and my goal is 340. If things go
        well, 350 will be my stretch goal, but I'll be happy with any result,
        knowing that I'm doing my best to find all the birds that pass through
        or breed in the state.
      </p>
      <ButtonGroup variant="outlined">
        <Button href="https://ebird.org/tripreport/325880" component="a">
          Jan
        </Button>
        <Button href="https://ebird.org/tripreport/330554" component="a">
          Feb
        </Button>
        <Button href="https://ebird.org/tripreport/337360" component="a">
          Mar
        </Button>
        <Button href="https://ebird.org/tripreport/340906" component="a">
          Apr
        </Button>
      </ButtonGroup>
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
                <Link
                  href={`https://ebird.org/checklist/${birds[0].checklistId}`}
                  target="_blank"
                  underline="always"
                  color="primary"
                >
                  {birds[0].name}
                </Link>
              </Typography>
              <span style={{ textAlign: "center" }}>
                {dayjs(birds[0].date).format("MMM DD")}
              </span>
              <hr style={{ width: "100%" }} />
              <Typography level="h4" textAlign="center" textColor={"#9e9e9e"}>
                First Bird
              </Typography>
              <Typography level="h3" fontSize={30} textAlign="center">
                <Link
                  href={`https://ebird.org/checklist/${
                    birds[birds.length - 1].checklistId
                  }`}
                  target="_blank"
                  underline="always"
                  color="primary"
                >
                  {birds[birds.length - 1].name}
                </Link>
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
