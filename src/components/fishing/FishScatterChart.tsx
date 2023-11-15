import { Fish, Species } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { ScatterChart, ScatterValueType } from "@mui/x-charts";
import React from "react";

interface Props {
  fish: Fish[];
  year?: number;
}

export default function FishScatterChart({ fish, year }: Props) {
  const series = (species: Species) => {
    return {
      label: titleCase(species),
      data: fish
        .filter((f) => f.species === species)
        .filter((f) => !year || f.year === year)
        .map((f, id) => ({ x: f.length, y: f.weight, id })),
      valueFormatter: ({ x, y }: ScatterValueType) => `${y}lb ${x}in`,
    };
  };

  return (
    <ScatterChart
      xAxis={[{ label: "Length (in)" }]}
      yAxis={[{ label: "Weight (lb)" }]}
      series={[
        series(Species.Bass),
        series(Species.Northern),
        series(Species.Walleye),
      ]}
      height={400}
    />
  );
}
