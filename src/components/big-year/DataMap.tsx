import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import countyGeoJson from "../../../data/big-year/nebraska.geojson.json";
import countyData from "../../../data/big-year/counties";
import React from "react";

const gradient = [
  "#0b0d0e",
  "#005798",
  "#006aa5",
  "#007db5",
  "#0092c4",
  "#00a7d2",
  "#04b0db",
  "#00bddd",
  "#40e8e5",
  "#4cfffc",
];

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
    .scaleLinear(gradient)
    .domain([0, 4, 9, 15, 20, 25, 40, 50, 60, 100]);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {(countyGeoJson as FeatureCollection).features.map((county) => {
        const value = countyData[county.properties!.NAME] ?? 0;

        return (
          <path
            key={county.properties!.GEO_ID}
            d={path(county) ?? ""}
            stroke="lightGrey"
            strokeWidth={0.5}
            fill={colorScale(value)}
            className="county"
          />
        );
      })}
    </svg>
  );
};
