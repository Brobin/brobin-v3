import { PhotoGeoData } from "@brobin/types/flickr";
import { Box } from "@mui/joy";
import Leaflet, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const icon = Leaflet.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface Props {
  data: PhotoGeoData;
}

export default function PhotoMap({ data }: Props) {
  const position = [data.latitude, data.longitude] as LatLngExpression;

  return (
    <Box
      sx={{
        maxWidth: "400px",
        height: "300px",
        width: "100%",
      }}
    >
      <MapContainer
        center={position}
        zoom={12}
        zoomControl={false}
        attributionControl={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          backgroundColor: "transparent",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={icon}>
          <Popup>
            {data.county}, {data.region}, {data.country}
            <br />
            {data.latitude}, {data.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
