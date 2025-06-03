import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Marker, MarkerClusterGroup } from "leaflet";
import useMapContext from "./MapContext";

export default function BirdList() {
  const { filteredBirds, map } = useMapContext();

  return (
    <List
      sx={{
        overflow: "scroll",
      }}
    >
      {filteredBirds.map((bird) => {
        const date = new Date(bird.date).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        });
        return (
          <ListItem key={bird.id} sx={{ py: 0.5 }}>
            <ListItemButton>
              <ListItemAvatar>{bird.id}</ListItemAvatar>
              <ListItemText
                primary={bird.name}
                secondary={`${date}, ${bird.location}`}
                onClick={() => {
                  map?.setView([bird.lat, bird.lng], 13);
                  map?.eachLayer((layer) => {
                    if (layer instanceof MarkerClusterGroup) {
                      layer.eachLayer((layer) => {
                        const marker = layer as Marker;
                        const latLng = marker.getLatLng();
                        if (
                          latLng.lat === bird.lat &&
                          latLng.lng === bird.lng
                        ) {
                          setTimeout(() => marker.fire("click"), 200);
                        }
                      });
                    }
                  });
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
