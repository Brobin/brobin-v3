import { Species, Year } from "@brobin/types/fishing";
import { titleCase } from "@brobin/utils";
import { BarChart } from "@mui/x-charts";

interface Props {
  year: Year;
}

export default function YearBarChart({ year }: Props) {
  const series = (species: Species) => ({
    dataKey: species,
    label: titleCase(species),
    stack: "0",
  });

  return (
    <BarChart
      dataset={year.days}
      xAxis={[
        {
          dataKey: "day",
          label: "Day",
          scaleType: "band",
          valueFormatter: (value) => value.substring(0, 3),
        },
      ]}
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
