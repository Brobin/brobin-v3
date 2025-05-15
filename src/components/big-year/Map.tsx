import { Bird } from "@brobin/types/big-year";
import Leaflet from "leaflet";
import "leaflet.markercluster";
import React from "react";

export default function BigYearMap({ birds = [] }: { birds?: Bird[] }) {
  const map = Leaflet.map("map").setView([41.636423, -100.0759779], 7);

  Leaflet.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
    minZoom: 7,
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  function getPopup(coordBirds: Bird[]) {
    let startDate: string | undefined;
    let str = "";
    coordBirds.forEach((bird) => {
      if (bird.date !== startDate) {
        if (startDate !== undefined) {
          str = str.concat("<br/>");
        }
        str = str.concat(`${bird.date}<br/>`);
        startDate = bird.date;
      }
      str = str.concat(`#${bird.id}) <b>${bird.name}</b><br/>`);
    });
    return str;
  }

  const coords = new Set(
    birds.filter((b) => b.lat && b.lng).map((b) => `${b.lat},${b.lng}`)
  );

  coords.forEach((coord) => {
    const [lat, lng] = coord.split(",").map(Number);
    const coordBirds = birds
      .filter((b) => b.lat === lat && b.lng === lng)
      .sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    Leaflet.marker([lat as number, lng as number])
      .bindPopup(getPopup(coordBirds))
      .addTo(map);
  });

  return <></>;
}
