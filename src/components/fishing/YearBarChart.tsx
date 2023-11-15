import { Species, Year } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { BarChart } from "@mui/x-charts";

interface Props {
  year: Year;
}

export default function YearBarChart({ year }: Props) {
  const speciesData = (species: Species) => ({
    dataKey: species,
    label: titleCase(species),
    stack: "0",
  });

  return (
    <BarChart
      dataset={year.days}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "day",
          label: "Day",
          valueFormatter: (value) => value.substring(0, 3),
        },
      ]}
      yAxis={[{ label: "Fish" }]}
      series={[
        speciesData(Species.Bass),
        speciesData(Species.Northern),
        speciesData(Species.Walleye),
      ]}
      height={400}
    />
  );
}
