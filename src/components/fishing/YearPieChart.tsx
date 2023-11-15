import { Species, Year, totalFish } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { PieChart } from "@mui/x-charts";
import React from "react";

interface Props {
  year: Year;
}

export default function YearPieChart({ year }: Props) {
  const speciesData = React.useCallback(
    (species: Species) => ({
      value: totalFish(year, species),
      label: titleCase(species),
    }),
    [year]
  );

  return (
    <PieChart
      series={[
        {
          data: [
            speciesData(Species.Bass),
            speciesData(Species.Northern),
            speciesData(Species.Walleye),
          ],
        },
      ]}
      height={400}
    />
  );
}
