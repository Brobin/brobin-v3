import Page from "@brobin/components/Page";
import { Bird } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import { Box, Button, Card, Grid, Link, Typography } from "@mui/joy";
import { LineChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

interface Props {
  birds: Bird[];
  series: { date: string; total: number; new: number }[];
}

export default function BigYear({ birds, series }: Props) {
  return (
    <Page title="Nebraska Big Year 2025">
      <Typography level="h1">Nebraska Big Year 2025</Typography>
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
                <span style={{ color: "#9e9e9e" }}>/ 348</span>
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
                Species
              </Typography>
              <LineChart
                xAxis={[
                  {
                    data: series.map((s) => dayjs(s.date).toDate()),
                    label: "Day",
                    scaleType: "point",
                    min: dayjs("01 Jan 2024").toDate(),
                    max: dayjs().toDate(),
                    valueFormatter: (date) => dayjs(date).format("MMM DD"),
                  },
                ]}
                yAxis={[{ label: "Species", min: 0 }]}
                series={[
                  {
                    data: series.map((s) => s.total),
                    label: "Total",
                    showMark: () => true,
                  },
                  {
                    data: series.map((s) => s.new),
                    label: "New",
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
                  valueFormatter: ({ value }) => dayjs(value).format("MMM DD"),
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
  const today = dayjs();

  while (currentDay <= today) {
    series.push({
      date: currentDay.format("DD MMM YYYY"),
      total: birds.filter((b) => dayjs(b.date) <= currentDay).length,
      new: birds.filter((b) => dayjs(b.date) === currentDay).length,
    });
    currentDay = currentDay.add(1, "day");
  }

  return {
    props: { birds, series },
    revalidate: 1,
  };
}
