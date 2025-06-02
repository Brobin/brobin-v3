import { Bird } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import React from "react";

type LatLng = {
  lat: number;
  lng: number;
};

export interface MapContextType {
  birds: Bird[];
  birdMarkers: LatLng[];
  loading?: boolean;
  getCountByCoordinates: (coordinates: LatLng[]) => number;
}

const initialContext: MapContextType = {
  birds: [],
  birdMarkers: [],
  getCountByCoordinates: () => 0,
};

export const MapContext = React.createContext<MapContextType>(initialContext);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [birds, setBirds] = React.useState<Bird[]>([]);
  const [loading, setLoading] = React.useState<boolean>();

  React.useEffect(() => {
    if (!birds.length && !loading) {
      setLoading(true);
      getBirdList().then((apiBirds) => {
        setBirds(apiBirds);
        setLoading(false);
      });
    }
  }, [birds, loading]);

  const getCountByCoordinates = React.useCallback(
    (coordinates: LatLng[]) => {
      let count = 0;
      coordinates.forEach((coord) => {
        count += birds.filter(
          ({ lat, lng }) => lat === coord.lat && lng === coord.lng
        ).length;
      });
      console.log(count);
      return count;
    },
    [birds]
  );

  const birdMarkers = React.useMemo(() => {
    return (
      Array.from(
        new Set(
          birds.filter((b) => b.lat && b.lng).map((b) => `${b.lat},${b.lng}`)
        )
      ).map((latLng): LatLng => {
        const [lat, lng] = latLng.split(",", 2).map(Number);
        return { lat, lng };
      }) || []
    );
  }, [birds]);

  return (
    <MapContext.Provider
      value={React.useMemo(
        () => ({ birds, birdMarkers, loading, getCountByCoordinates }),
        [birds, birdMarkers, loading, getCountByCoordinates]
      )}
    >
      {children}
    </MapContext.Provider>
  );
}

export default function useMapContext() {
  return React.useContext(MapContext);
}
