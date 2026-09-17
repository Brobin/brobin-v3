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
  counties?: Set<string>;
  center?: [number, number];
  width?: number;
  height?: number;
  scale?: number;
};

export const DataMap = ({
  counties = new Set(),
  center = [41.4925, -99.9018],
  width = 1120,
  height = 560,
  scale = 7340,
}: DataMapProps) => {
  const projection = d3
    .geoMercator()
    .center([center[1], center[0]])
    .translate([width / 2 - 25, height / 2])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  return (
    <>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
        {(countyGeoJson as FeatureCollection).features.map((county) => (
          <Tippy
            plugins={[followCursor]}
            key={county.properties!.GEO_ID}
            content={`${county.properties!.NAME}`}
            delay={[0, 0]}
            duration={0}
            followCursor
          >
            <path
              d={path(county) ?? ""}
              stroke="#f0f4f8"
              strokeWidth={1}
              fill={
                counties.has(county.properties!.NAME)
                  ? "rgb(41, 98, 57)"
                  : "#0b0d0e"
              }
              className="county"
            />
          </Tippy>
        ))}
      </svg>
    </>
  );
};
