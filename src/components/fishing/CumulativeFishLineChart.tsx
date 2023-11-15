import { Day, Year } from "@brobin/types/fishing";
import { LineChart } from "@mui/x-charts";
import React from "react";

interface Props {
  years: Year[];
}

export default function CumulativeFishLineChart({ years }: Props) {
  const yearData = React.useMemo(
    () =>
      years.map((year) => {
        const cumulativeSum = (
          (sum) => (day: Day) =>
            (sum += day.bass + day.northern + day.walleye)
        )(0);
        return {
          data: year.days.map(cumulativeSum),
          label: year.year.toString(),
          showMark: () => false,
        };
      }),
    [years]
  );

  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 2, 3, 4, 5, 6],
          scaleType: "point",
          label: "Day",
          valueFormatter: (index: number) =>
            [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ][index],
        },
      ]}
      yAxis={[{ label: "Fish" }]}
      series={yearData}
      height={400}
      slotProps={{ legend: { hidden: true } }}
    />
  );
}
