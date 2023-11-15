import { Species, Year, totalFish } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { AxisConfig, BarChart } from "@mui/x-charts";
import React from "react";

interface Props {
  years: Year[];
}

export default function TotalFishBarChart({ years }: Props) {
  const series = React.useCallback(
    (species: Species) => ({
      data: years.map((year) => totalFish(year, species)),
      stack: "A",
      label: titleCase(species),
    }),
    [years]
  );

  const xAxis: Omit<AxisConfig, "id"> = React.useMemo(
    () => ({
      data: years.map((_, index) => index),
      scaleType: "band",
      valueFormatter: (index: number) =>
        years.map(({ year }) => year)[index].toString(),
      label: "Year",
    }),
    [years]
  );

  return (
    <BarChart
      xAxis={[xAxis]}
      yAxis={[{ label: "Fish" }]}
      series={[
        series(Species.Bass),
        series(Species.Northern),
        series(Species.Walleye),
      ]}
      height={400}
    />
  );
}
