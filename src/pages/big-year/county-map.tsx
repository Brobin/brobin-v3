import Page from "@brobin/components/Page";
import { Box, Button, Card, Typography } from "@mui/joy";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
import { Carlito } from "next/font/google";
import { useRef } from "react";
import countyGeoJson from "../../../data/big-year/nebraska.geojson.json";

const carlito = Carlito({ subsets: ["latin"], weight: ["400", "700"] });

const width = 1120;
const height = 560;

const counties = countyGeoJson as FeatureCollection;

const projection = d3.geoMercator().fitExtent(
  [
    [10, 10],
    [width - 10, height - 10],
  ],
  counties,
);
const path = d3.geoPath().projection(projection);

const mapBounds = path.bounds(counties);
const legendRowHeight = 36;

type Region = "West" | "North" | "South" | "East";

// All colors have >= 5:1 contrast against the dark label/outline color below.
const INK = "#0b0d0e";
const regionColors: Record<Region, string> = {
  West: "#b5e8a4", // light green
  North: "#5b86e5", // dark blue
  South: "#5ec8e8", // light blue
  East: "#4fc3a1", // dark green
};

// Text shown for each region in the key.
const regionNames: Record<Region, string> = {
  West: "West / Panhandle",
  North: "North",
  South: "South",
  East: "East",
};

const panhandle = new Set([
  "Banner",
  "Box Butte",
  "Cheyenne",
  "Dawes",
  "Deuel",
  "Garden",
  "Kimball",
  "Morrill",
  "Scotts Bluff",
  "Sheridan",
  "Sioux",
]);

// Counties south of the Platte River (outside the panhandle and east region).
// The counties the river runs through (Keith, Lincoln, Dawson, Buffalo, Hall,
// Merrick and Hamilton) are all counted as South.
const south = new Set([
  "Adams",
  "Buffalo",
  "Chase",
  "Clay",
  "Dawson",
  "Dundy",
  "Franklin",
  "Frontier",
  "Furnas",
  "Gosper",
  "Hall",
  "Hamilton",
  "Harlan",
  "Hayes",
  "Hitchcock",
  "Kearney",
  "Keith",
  "Lincoln",
  "Merrick",
  "Nuckolls",
  "Perkins",
  "Phelps",
  "Red Willow",
  "Webster",
]);

// "East" is everything whose center lies east of Clay County's eastern edge.
const clay = counties.features.find((c) => c.properties!.NAME === "Clay")!;
const eastBoundaryX = path.bounds(clay)[1][0];

// Per-county label nudges, in SVG units (positive x = right, positive y = down).
const labelOffsets: Record<string, { x?: number; y?: number }> = {
  "Scotts Bluff": { x: -3 },
  Gosper: { x: 8 },
  Merrick: { x: -16 },
  Nance: { y: 6 },
  Hamilton: { y: 17 },
  Cass: { y: 8 },
  Richardson: { x: -10 },
  Nemaha: { x: -7, y: 6 },
  Polk: { y: 10 },
  Wayne: { y: 8 },
  Butler: { y: 2 },
  Dakota: { x: -1 },
  Dixon: { x: -2, y: -3 },
  Washington: { x: 2 },
};

function getRegion(name: string, centerX: number): Region {
  if (panhandle.has(name)) return "West";
  if (centerX > eastBoundaryX) return "East";
  return south.has(name) ? "South" : "North";
}

// Everything needed to draw each county, computed once.
const countyLabels = counties.features.map((county) => {
  const name = county.properties!.NAME as string;
  const [[x0, y0], [x1, y1]] = path.bounds(county);
  const offset = labelOffsets[name] ?? {};
  return {
    county,
    lines: name.split(" "),
    region: getRegion(name, (x0 + x1) / 2),
    labelX: (x0 + x1) / 2 + (offset.x ?? 0),
    labelY: (y0 + y1) / 2 - 6 + (offset.y ?? 0),
  };
});

const EXPORT_SCALE = 3;

// Collects the page's Carlito @font-face rules as base64 data URIs, so the font
// survives when the SVG is rendered as a standalone image.
async function embeddedFontCss(family: string): Promise<string> {
  let css = "";
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (
        !(rule instanceof CSSFontFaceRule) ||
        rule.style.getPropertyValue("font-family").replace(/["']/g, "") !==
          family
      ) {
        continue;
      }
      const url = rule.style
        .getPropertyValue("src")
        .match(/url\(["']?([^"')]+)["']?\)/)?.[1];
      if (!url) continue;
      const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
      let binary = "";
      for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      css += `@font-face{font-family:"${family}";font-weight:${rule.style.getPropertyValue(
        "font-weight",
      )};src:url(data:font/woff2;base64,${btoa(binary)}) format("woff2");}`;
    }
  }
  return css;
}

export default function CountyMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  const exportPng = async () => {
    const svg = svgRef.current;
    if (!svg) return;

    const family = carlito.style.fontFamily
      .split(",")[0]
      .replace(/["']/g, "")
      .trim();
    let fontCss = "";
    try {
      fontCss = await embeddedFontCss(family);
    } catch {
      // Fall back to the default sans-serif font if the font can't be embedded.
    }

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // Crop to the map itself (plus 1 unit so the outlines aren't clipped).
    const cropX = mapBounds[0][0] - 1;
    const cropY = mapBounds[0][1] - 1;
    const cropWidth = mapBounds[1][0] - mapBounds[0][0] + 2;
    // Extra whitespace along the bottom of the image.
    const bottomPadding = 8;
    const cropHeight = mapBounds[1][1] - mapBounds[0][1] + 2 + bottomPadding;
    clone.setAttribute("viewBox", `${cropX} ${cropY} ${cropWidth} ${cropHeight}`);
    clone.setAttribute("width", String(cropWidth));
    clone.setAttribute("height", String(cropHeight));
    const style = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style",
    );
    style.textContent = `${fontCss} text{font-family:"${family}",sans-serif;}`;
    clone.insertBefore(style, clone.firstChild);

    const blobUrl = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(clone)], {
        type: "image/svg+xml;charset=utf-8",
      }),
    );
    try {
      const img = new Image();
      img.src = blobUrl;
      await img.decode();

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(cropWidth * EXPORT_SCALE);
      canvas.height = Math.round(cropHeight * EXPORT_SCALE);
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const png = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!png) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(png);
      link.download = "nebraska-county-map.png";
      link.click();
      URL.revokeObjectURL(link.href);
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  };

  return (
    <Box
      sx={{
        "&, & *": { fontFamily: `${carlito.style.fontFamily} !important` },
      }}
    >
      <Page
        title="Nebraska County Map"
        description="A map of the 93 counties of Nebraska."
      >
        <Typography level="h1">Nebraska Counties</Typography>
        <Button size="sm" variant="outlined" onClick={exportPng}>
          Export PNG
        </Button>
        <Card variant="plain" sx={{ marginY: 2, backgroundColor: "#fff" }}>
          <svg ref={svgRef} width="100%" viewBox={`0 0 ${width} ${height}`}>
            {/* Layer 1: county shapes */}
            {countyLabels.map(({ county, region }) => (
              <path
                key={county.properties!.GEO_ID}
                d={path(county) ?? ""}
                stroke={INK}
                strokeWidth={1}
                fill={regionColors[region]}
              />
            ))}
            {/* Layer 2: county names */}
            {countyLabels.map(({ county, lines, labelX, labelY }) => (
              <text
                key={county.properties!.GEO_ID}
                x={labelX}
                y={labelY}
                fill={INK}
                fontSize={13}
                textAnchor="middle"
                pointerEvents="none"
              >
                {lines.map((line, i) => (
                  <tspan
                    key={line}
                    x={labelX}
                    dy={
                      i === 0
                        ? `${0.35 - (lines.length - 1) * 0.55}em`
                        : "1.1em"
                    }
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
            {/* Key, in the empty space below the panhandle */}
            <rect
              x={mapBounds[0][0]}
              y={mapBounds[1][1] - legendRowHeight * 3 - 26 - 20}
              width={238}
              height={legendRowHeight * 3 + 26 + 20}
              rx={4}
              fill="#fff"
              stroke={INK}
              strokeWidth={1.5}
            />
            {(Object.keys(regionColors) as Region[]).map((region, i) => (
              <g
                key={region}
                transform={`translate(${mapBounds[0][0] + 10}, ${
                  mapBounds[1][1] - legendRowHeight * (4 - i)
                })`}
              >
                <rect
                  width={26}
                  height={26}
                  rx={3}
                  fill={regionColors[region]}
                  stroke={INK}
                />
                <text
                  x={36}
                  y={20}
                  fill={INK}
                  fontSize={22}
                  fontWeight={700}
                >
                  {regionNames[region]}
                </text>
              </g>
            ))}
          </svg>
        </Card>
      </Page>
    </Box>
  );
}
