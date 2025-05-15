/* eslint-disable @next/next/no-sync-scripts */
import { Bird } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo } from "react";

export default function Map({ birds = [] }: { birds: Bird[] }) {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/big-year/Map"), {
        loading: () => <p>Loading interactive map</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Map birds={birds} />
      <div
        id="map"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
        }}
      ></div>
    </>
  );
}

export async function getStaticProps() {
  const birds = await getBirdList();

  return { props: { birds } };
}
