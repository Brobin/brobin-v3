import { Bird } from "@brobin/types/big-year";
import Leaflet from "leaflet";
import "leaflet.markercluster";
import React from "react";
import useMapContext from "./MapContext";

const map = Leaflet.map("map", {
  minZoom: 6,
  maxZoom: 13,
  zoomControl: false,
}).setView([41.636423, -100.0759779], 7);

Leaflet.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
    minZoom: 6,
    maxZoom: 16,
  }
).addTo(map);

export default function BigYearMap() {
  const { birds, coordinates, loading, getCountByCoordinates, setMap } =
    useMapContext();
  const [initialized, setInitialized] = React.useState(false);

  function getPopup(coordBirds: Bird[]) {
    let startDate: string | undefined;
    let str = "";
    coordBirds.forEach((bird) => {
      if (bird.date !== startDate) {
        if (startDate !== undefined) {
          str = str.concat("<br/>");
        }
        const date = new Date(bird.date).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        });
        str = str.concat(`${date}<br/>`);
        startDate = bird.date;
      }
      str = str.concat(`${bird.id}) <b>${bird.name}</b><br/>`);
    });
    return str;
  }

  // Initialize markers
  React.useEffect(() => {
    if (!map || !birds.length || loading || initialized) return;

    setMap(map);

    const markers = Leaflet.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        const count = getCountByCoordinates(
          cluster.getAllChildMarkers().map((marker) => marker.getLatLng())
        );

        var c = "marker-cluster-";
        if (count < 10) {
          c += "small";
        } else if (count < 50) {
          c += "medium";
        } else {
          c += "large";
        }
        return new Leaflet.DivIcon({
          html: "<div><span>" + count + "</span></div>",
          className: "marker-cluster " + c,
          iconSize: new Leaflet.Point(40, 40),
        });
      },
    });

    coordinates.forEach(({ lat, lng }) => {
      const coordBirds = birds
        .filter((b) => b.lat === lat && b.lng === lng)
        .sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
      markers.addLayer(
        Leaflet.marker([lat as number, lng as number], {
          icon: Leaflet.divIcon({
            className: "my-custom-icon",
            popupAnchor: [0, -34],
            iconAnchor: [12.5, 34],
            iconSize: [25, 34],
            html: `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 33"><path fill="#5286bf" d="m12.02,32.98c-.32,0-.81-.11-1.29-.67-3.01-3.51-5.41-6.84-7.31-10.17-1.45-2.54-2.39-4.71-2.95-6.8C-.5,11.74.04,8.37,2.05,5.34,3.77,2.76,6.19,1.06,9.23.33c.43-.1.87-.17,1.31-.23.19-.03.39-.06.58-.09h1.69c.27.03.47.06.66.09.44.06.88.13,1.31.23,3.4.85,6.01,2.85,7.75,5.95.85,1.53,1.35,3.25,1.45,5.12.15,2.62-.66,4.95-1.38,6.69-1.24,2.97-2.98,5.97-5.34,9.17-1.02,1.39-2.12,2.75-3.19,4.06l-.79.99c-.46.57-.94.69-1.27.69v-.02Z"/><text x="50%" y="50%" fill="white" dominant-baseline="middle" text-anchor="middle">${coordBirds.length}</text></svg>`,
          }),
        }).bindPopup(getPopup(coordBirds))
      );
    });
    map.addLayer(markers);

    setInitialized(true);
  }, [birds, coordinates, getCountByCoordinates, initialized, loading, setMap]);

  return <></>;
}
