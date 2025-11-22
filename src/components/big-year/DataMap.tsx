import Tippy from "@tippyjs/react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

import countyData from "../../../data/big-year/counties";
import countyGeoJson from "../../../data/big-year/nebraska.geojson.json";

type DataMapProps = {
  center?: [number, number];
  width?: number;
  height?: number;
  scale?: number;
};

export const DataMap = ({
  center = [41.4925, -99.9018],
  width = 1120,
  height = 560,
  scale = 7000,
}: DataMapProps) => {
  const projection = d3
    .geoMercator()
    .center([center[1], center[0]])
    .translate([width / 2 - 25, height / 2])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  const colorScale = d3
    .scaleLinear(["#082031", "#005798", "#0092c4", "#4cfffc"])
    .domain([1, 5, 20, 100]);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
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
  );
};
