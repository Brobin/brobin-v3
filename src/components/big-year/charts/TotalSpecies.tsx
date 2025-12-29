import {
  BarPlot,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import dayjs from "dayjs";

interface Props {
  series: { date: string; total: number; new: number }[];
}

export default function TotalSpecies({ series }: Props) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveChartContainer
        colors={mangoFusionPalette}
        xAxis={[
          {
            data: series.map((s) => dayjs(s.date).toDate()),
            label: "Week",
            scaleType: "band",
            min: dayjs("01 Jan 2025").toDate(),
            max: dayjs("31 Dec 2025").toDate(),
            valueFormatter: (date) => {
              let lastDay = dayjs(date).day(6);
              if (lastDay.year() === 2026) lastDay = dayjs("31 Dec 2025");
              return `${dayjs(date).format("MMM DD")} - ${lastDay.format(
                "MMM DD"
              )}`;
            },
            id: "x-axis",
          },
        ]}
        yAxis={[
          { label: "Species", id: "left" },
          { label: "Species", id: "right" },
        ]}
        series={[
          {
            data: series.map((s) => s.total),
            stack: "A",
            label: "Year Total",
            type: "line",
          },
          {
            data: series.map((s) => s.new),
            stack: "A",
            label: "Species Added",
            type: "bar",
            yAxisKey: "right",
          },
        ]}
      >
        <ChartsLegend />
        <ChartsTooltip />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsYAxis label="Total Species" axisId="left" />
        <ChartsYAxis label="New Species" axisId="right" position="right" />
        <ChartsXAxis label="Month" axisId="x-axis" />
      </ResponsiveChartContainer>
    </div>
  );
}
