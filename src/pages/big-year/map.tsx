/* eslint-disable @next/next/no-sync-scripts */
import { MapProvider } from "@brobin/components/big-year/MapContext";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo } from "react";

export default function Map() {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/big-year/Map"), {
        loading: () => <p>Loading interactive map</p>,
        ssr: false,
      }),
    []
  );

  const MapDrawer = useMemo(
    () =>
      dynamic(() => import("../../components/big-year/MapDrawer"), {
        loading: () => <p>Loading interactive map</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Head>
        <title>Nebraska Big Year Map</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://app.unpkg.com/leaflet.heat@0.2.0/files/dist/leaflet-heat.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <MapProvider>
        <Box sx={{ display: "flex" }}>
          <MapDrawer />
          <div>
            <Map />
            <div
              id="map"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
              }}
            ></div>
          </div>
        </Box>
      </MapProvider>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
