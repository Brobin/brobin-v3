import { Box } from "@mui/joy";
import Leaflet, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const icon = Leaflet.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

interface Props {
  latitude: Number;
  longitude: Number;
}

export default function PhotoMap({ latitude, longitude }: Props) {
  const position = [latitude, longitude] as unknown as LatLngExpression;

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
        zoom={5}
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
          {/* <Popup>
            {data.county}, {data.region}, {data.country}
            <br />
            {data.latitude}, {data.longitude}
          </Popup> */}
        </Marker>
      </MapContainer>
    </Box>
  );
}
