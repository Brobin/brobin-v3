import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import data from "../../../data/big-year/nebraska.geojson.json";
import React from "react";

export const DataMap = () => {
  const projection = d3.geoAlbersUsa().scale(9500).translate([945, 770]);
  const geoPathGenerator = d3.geoPath().projection(projection);

  return (
    <svg width="1120" height="560">
      {(data as FeatureCollection).features.map((county) => (
        <path
          key={county.properties!.GEO_ID}
          d={geoPathGenerator(county) as string}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill="grey"
          fillOpacity={0.7}
        />
      ))}
    </svg>
  );
};
