import Tippy from "@tippyjs/react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

import { countyYearBirds, countyTotals } from "../../../data/big-year/counties";
import countyGeoJson from "../../../data/big-year/nebraska.geojson.json";
import React from "react";
import { Button } from "@mui/joy";

type DataMapProps = {
  center?: [number, number];
  width?: number;
  height?: number;
  scale?: number;
};

enum MapMode {
  AllBirds = "All",
  YearBirds = "Year",
}

export const DataMap = ({
  center = [41.4925, -99.9018],
  width = 1120,
  height = 560,
  scale = 7340,
}: DataMapProps) => {
  const [mode, setMode] = React.useState<MapMode>(MapMode.YearBirds);

  const countyData = React.useMemo(
    () => (mode === MapMode.AllBirds ? countyTotals : countyYearBirds),
    [mode]
  );

  const max = React.useMemo(
    () => Math.max(...Object.values(countyData)),
    [countyData]
  );

  const domain = React.useMemo(
    () => (mode === MapMode.AllBirds ? [1, 20, 50, 250] : [1, 5, 20, 100]),
    [mode]
  );

  const projection = d3
    .geoMercator()
    .center([center[1], center[0]])
    .translate([width / 2 - 25, height / 2])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  const gradient = ["#082031", "#005798", "#0092c4", "#4cfffc"];
  const colorScale = d3.scaleLinear(gradient).domain(domain);

  return (
    <>
      <Button
        size="sm"
        variant="outlined"
        onClick={() => {
          if (mode === MapMode.AllBirds) {
            setMode(MapMode.YearBirds);
          } else {
            setMode(MapMode.AllBirds);
          }
        }}
      >
        Show {mode === MapMode.AllBirds ? "Year" : "All"} Birds
      </Button>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="legend">
            <stop className="legend1" offset="0%" stopColor={gradient[0]} />
            <stop className="legend2" offset="25%" stopColor={gradient[1]} />
            <stop className="legend3" offset="50%" stopColor={gradient[2]} />
            <stop className="legend4" offset="100%" stopColor={gradient[3]} />
          </linearGradient>
        </defs>
        <text x="5" y="520" fill="grey">
          {domain[0]}
        </text>
        <rect
          className="legend"
          x="25"
          y="505"
          width="180"
          height="20"
          stroke="grey"
          fill="url(#legend)"
        />
        <text x="215" y="520" fill="grey">
          {max}
        </text>
        {(countyGeoJson as FeatureCollection).features.map((county) => {
          const value = countyData[county.properties!.NAME] ?? 0;

          return (
            <Tippy
              plugins={[followCursor]}
              key={county.properties!.GEO_ID}
              content={`${county.properties!.NAME}: ${value}`}
              delay={[0, 0]}
              duration={0}
              followCursor
            >
              <path
                d={path(county) ?? ""}
                stroke="grey"
                strokeWidth={1}
                fill={value === 0 ? "#0b0d0e" : colorScale(value)}
                className="county"
              />
            </Tippy>
          );
        })}
      </svg>
    </>
  );
};
