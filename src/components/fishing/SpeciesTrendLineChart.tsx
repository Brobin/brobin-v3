import { Species, Year } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { AxisConfig, LineChart } from "@mui/x-charts";
import React from "react";
import regression, { DataPoint } from "regression";

interface Props {
  years: Year[];
}

export default function SpeciesTrendLineChart({ years }: Props) {
  const series = React.useCallback(
    (species: Species) => {
      const totals = years.map((year) =>
        year.days.reduce((sum, data) => sum + data[species], 0)
      );

      const result = regression.linear(
        totals.map((point, index): DataPoint => [index, point])
      );
      const trendline = totals.map((_, index) => result.predict(index)[1]);

      return [
        {
          data: totals,
          label: titleCase(species),
          showMark: () => false,
        },
        {
          data: trendline,
          label: `${titleCase(species)} Trend`,
          showMark: () => false,
        },
      ];
    },
    [years]
  );

  const xAxis: Omit<AxisConfig, "id"> = React.useMemo(() => {
    return {
      scaleType: "point",
      data: years.map((y) => y.year),
      valueFormatter: (v: number) => v.toString(),
      label: "Year",
    };
  }, [years]);

  return (
    <LineChart
      sx={{
        "& .MuiLineElement-series-auto-generated-id-1, .MuiLineElement-series-auto-generated-id-3, .MuiLineElement-series-auto-generated-id-5":
          {
            strokeDasharray: "10 5",
            strokeWidth: 2,
          },
      }}
      xAxis={[xAxis]}
      yAxis={[{ label: "Fish" }]}
      series={[
        ...series(Species.Bass),
        ...series(Species.Northern),
        ...series(Species.Walleye),
      ]}
      height={400}
    />
  );
}
