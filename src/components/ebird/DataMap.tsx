import Tippy from "@tippyjs/react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

import countyGeoJson from "../../../data/big-year/nebraska.geojson.json";
import React from "react";

const gradient = ["#edd376", "#ecbf72", "#e98864", "#e54353"];

type DataMapProps = {
  counties?: Set<string>;
  /** County name -> value. When provided, renders a heatmap instead of highlighting `counties`. */
  counts?: Record<string, number>;
  /** Called with the county name when a county is clicked. */
  onCountyClick?: (name: string) => void;
  center?: [number, number];
  width?: number;
  height?: number;
  scale?: number;
};

export const DataMap = ({
  counties = new Set(),
  counts,
  onCountyClick,
  center = [41.4925, -99.9018],
  width = 1120,
  height = 560,
  scale = 7340,
}: DataMapProps) => {
  const max = React.useMemo(
    () => (counts ? Math.max(1, ...Object.values(counts)) : 0),
    [counts],
  );

  const colorScale = React.useMemo(
    () => d3.scaleLinear(gradient).domain([1, max * 0.25, max * 0.5, max]),
    [max],
  );

  const projection = d3
    .geoMercator()
    .center([center[1], center[0]])
    .translate([width / 2 - 25, height / 2])
    .scale(scale);
  const path = d3.geoPath().projection(projection);

  return (
    <>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
        {counts && (
          <>
            <defs>
              <linearGradient id="legend">
                <stop offset="0%" stopColor={gradient[0]} />
                <stop offset="25%" stopColor={gradient[1]} />
                <stop offset="50%" stopColor={gradient[2]} />
                <stop offset="100%" stopColor={gradient[3]} />
              </linearGradient>
            </defs>
            <text x="5" y="520" fill="#f0f4f8">
              1
            </text>
            <rect
              x="25"
              y="505"
              width="180"
              height="20"
              stroke="#f0f4f8"
              fill="url(#legend)"
            />
            <text x="215" y="520" fill="#f0f4f8">
              {max}
            </text>
          </>
        )}
        {(countyGeoJson as FeatureCollection).features.map((county) => {
          const name = county.properties!.NAME;
          const value = counts?.[name] ?? 0;
          const fill = counts
            ? value === 0
              ? "#0b0d0e"
              : colorScale(value)
            : counties.has(name)
              ? "#e54353"
              : "#0b0d0e";

          return (
            <Tippy
              plugins={[followCursor]}
              key={county.properties!.GEO_ID}
              content={counts ? `${name}: ${value}` : `${name}`}
              delay={[0, 0]}
              duration={0}
              followCursor
            >
              <path
                d={path(county) ?? ""}
                stroke="#f0f4f8"
                strokeWidth={1}
                fill={fill}
                className="county"
                style={onCountyClick ? { cursor: "pointer" } : undefined}
                onClick={() => onCountyClick?.(name)}
              />
            </Tippy>
          );
        })}
      </svg>
    </>
  );
};
