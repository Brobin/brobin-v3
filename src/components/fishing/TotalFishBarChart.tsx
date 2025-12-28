import { Species, Year, totalFish } from "@brobin/types/fishing";
import { titleCase } from "title-case";
import { BarChart } from "@mui/x-charts";

interface Props {
  years: Year[];
}

export default function TotalFishBarChart({ years }: Props) {
  const series = (species: Species) => ({
    data: years.map((year) => totalFish(year, species)),
    stack: "A",
    label: titleCase(species),
  });

  return (
    <BarChart
      xAxis={[
        {
          data: years.map((_, index) => index),
          label: "Year",
          scaleType: "band",
          valueFormatter: (index: number) =>
            years.map(({ year }) => year)[index].toString(),
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
