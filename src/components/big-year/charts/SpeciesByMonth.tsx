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

export default function SpeciesByMonth({ months }: Props) {
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
        yAxis={[{ label: "Species" }]}
        series={[
          {
            data: months.map((m) =>
              months
                .filter((prev) => prev.month <= m.month)
                .reduce((sum, current) => sum + current.yearBirds, 0)
            ),
            stack: "A",
            label: "Year Total",
            type: "line",
          },
          {
            data: months.map((m) => m.species - m.yearBirds),
            stack: "A",
            label: "Other",
            type: "bar",
          },
          {
            data: months.map((m) => m.yearBirds - m.stateBirds),
            stack: "A",
            label: "Year Birds",
            type: "bar",
          },
          {
            data: months.map((m) => m.stateBirds - m.lifeBirds),
            stack: "A",
            label: "State Birds",
            type: "bar",
          },
          {
            data: months.map((m) => m.lifeBirds),
            stack: "A",
            label: "Life Birds",
            type: "bar",
          },
        ]}
      >
        <ChartsLegend />
        <ChartsTooltip />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsYAxis label="Species" />
        <ChartsXAxis label="Month" axisId="x-axis" />
      </ResponsiveChartContainer>
    </div>
  );
}
