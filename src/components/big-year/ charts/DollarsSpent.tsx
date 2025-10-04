import { Month } from "@brobin/types/big-year";
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

interface Props {
  months: Month[];
}

export default function DollarsSpent({ months }: Props) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveChartContainer
        colors={mangoFusionPalette}
        xAxis={[
          {
            data: months.map((month) => month.name),
            label: "Month",
            scaleType: "band",
            valueFormatter: (month) => month.slice(0, 3),
            id: "x-axis",
          },
        ]}
        yAxis={[
          { label: "Miles", id: "left" },
          { label: "Miles", id: "right" },
        ]}
        series={[
          {
            data: months.map((m) => m.cost),
            stack: "A",
            label: "Spent",
            type: "bar",
            yAxisKey: "left",
            valueFormatter: (value) => `$${value.toFixed(2)}`,
          },
          {
            data: months.map(
              (m) =>
                months
                  .filter((prev) => prev.month <= m.month)
                  .reduce((sum, current) => sum + current.cost, 0) /
                months
                  .filter((prev) => prev.month <= m.month)
                  .reduce((sum, current) => sum + current.yearBirds, 0)
            ),
            stack: "A",
            label: "Cost per Bird",
            type: "line",
            yAxisKey: "right",
            valueFormatter: (value) => `$${value.toFixed(2)}`,
          },
        ]}
      >
        <ChartsLegend />
        <ChartsTooltip />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsYAxis label="Sepnt" axisId="left" />
        <ChartsYAxis label="Cost per Bird" axisId="right" position="right" />
        <ChartsXAxis label="Month" axisId="x-axis" />
      </ResponsiveChartContainer>
    </div>
  );
}
