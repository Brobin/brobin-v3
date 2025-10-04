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

export default function MilesTraveled({ months }: Props) {
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
            data: months.map((m) => m.miles),
            stack: "A",
            label: "Miles",
            type: "bar",
            yAxisKey: "left",
          },
          {
            data: months.map(
              (m) =>
                months
                  .filter((prev) => prev.month <= m.month)
                  .reduce((sum, current) => sum + current.miles, 0) /
                months
                  .filter((prev) => prev.month <= m.month)
                  .reduce((sum, current) => sum + current.yearBirds, 0)
            ),
            stack: "A",
            label: "Miles per Bird",
            type: "line",
            yAxisKey: "right",
          },
        ]}
      >
        <ChartsLegend />
        <ChartsTooltip />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsYAxis label="Miles" axisId="left" />
        <ChartsYAxis label="Miles/bird" axisId="right" position="right" />
        <ChartsXAxis label="Month" axisId="x-axis" />
      </ResponsiveChartContainer>
    </div>
  );
}
