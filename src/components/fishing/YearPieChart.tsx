import { Species, Year, totalFish } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { PieChart } from "@mui/x-charts";
import React from "react";

interface Props {
  year: Year;
}

export default function YearPieChart({ year }: Props) {
  const series = (species: Species) => ({
    value: totalFish(year, species),
    label: titleCase(species),
  });

  return (
    <PieChart
      series={[
        {
          data: [
            series(Species.Bass),
            series(Species.Northern),
            series(Species.Walleye),
          ],
        },
      ]}
      height={400}
    />
  );
}
