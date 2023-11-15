import { Day, Year } from "@brobin/types/fishing";
import { LineChart } from "@mui/x-charts";
import React from "react";

interface Props {
  years: Year[];
}

export default function CumulativeFishLineChart({ years }: Props) {
  const series = (year: Year) => {
    const cumulativeSum = (
      (sum) => (day: Day) =>
        (sum += day.bass + day.northern + day.walleye)
    )(0);
    return {
      data: year.days.map(cumulativeSum),
      label: year.year.toString(),
      showMark: () => false,
    };
  };

  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 2, 3, 4, 5, 6],
          label: "Day",
          scaleType: "point",
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
      series={years.map(series)}
      height={400}
      slotProps={{ legend: { hidden: true } }}
    />
  );
}
