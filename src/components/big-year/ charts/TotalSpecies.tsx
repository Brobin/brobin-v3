import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

interface Props {
  series: { date: string; total: number; new: number }[];
}

export default function TotalSpecies({ series }: Props) {
  return (
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
          label: "Species",
          showMark: () => true,
        },
      ]}
      height={400}
    />
  );
}
