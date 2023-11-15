import { Fish, Species } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import {
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  LineSeriesType,
  ResponsiveChartContainer,
  ScatterPlot,
  ScatterSeriesType,
  ScatterValueType,
} from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import regression, { DataPoint } from "regression";

interface Props {
  fish: Fish[];
  year?: number;
}

export default function FishScatterChart({ fish, year }: Props) {
  const xValues = fish.map(({ length }) => length);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  const xAxisData = Array.from({ length: maxX - minX }, (v, k) => k + 1 + minX);

  const dataPoints = (species: Species): DataPoint[] =>
    fish
      .filter((f) => f.species === species)
      .filter((f) => !year || f.year === year)
      .map((f) => [f.length, f.weight]);

  const scatter = (species: Species): ScatterSeriesType => {
    return {
      type: "scatter",
      label: titleCase(species),
      data: dataPoints(species).map(([x, y], id) => ({ x, y, id })),
      valueFormatter: ({ x, y }: ScatterValueType) =>
        `${y.toFixed(1)}lb ${x.toFixed(1)}in`,
    };
  };

  const trend = (species: Species): LineSeriesType => {
    const points = dataPoints(species);
    const x = points.map(([x, _]) => x);
    const result = regression.linear(points);
    const minX = Math.min(...x) - 2;
    const maxX = Math.max(...x) + 2;

    const data = xAxisData.map((x) =>
      x > minX && x < maxX ? result.predict(x)[1] : null
    );

    return { type: "line", data };
  };

  return (
    <ResponsiveChartContainer
      height={400}
      xAxis={[{ label: "Length (in)", data: xAxisData }]}
      yAxis={[{ label: "Weight (lb)" }]}
      series={
        fish.length
          ? [
              { ...scatter(Species.Bass), id: "0" },
              { ...trend(Species.Bass), id: "1" },
              { ...scatter(Species.Northern), id: "2" },
              { ...trend(Species.Northern), id: "3" },
              { ...scatter(Species.Walleye), id: "4" },
              { ...trend(Species.Walleye), id: "5" },
            ]
          : []
      }
      sx={{
        "& .MuiLineElement-root": {
          strokeDasharray: "10 3",
          strokeWidth: 2,
        },
      }}
    >
      <LinePlot />
      <ScatterPlot slotProps={{ scatter: { markerSize: 5 } }} />
      <ChartsLegend />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsTooltip trigger="item" />
    </ResponsiveChartContainer>
  );
}
