import { Bird } from "@brobin/types/big-year";
import { getBirdList } from "@brobin/utils/big-year";
import { Map } from "leaflet";
import React from "react";

type LatLng = {
  lat: number;
  lng: number;
};

export interface MapContextType {
  map?: Map;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
  birds: Bird[];
  filteredBirds: Bird[];
  coordinates: LatLng[];
  loading?: boolean;
  getCountByCoordinates: (coordinates: LatLng[]) => number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const initialContext: MapContextType = {
  setMap: () => {},
  birds: [],
  filteredBirds: [],
  coordinates: [],
  getCountByCoordinates: () => 0,
  search: "",
  setSearch: () => {},
};

export const MapContext = React.createContext<MapContextType>(initialContext);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = React.useState<Map>();
  const [birds, setBirds] = React.useState<Bird[]>([]);
  const [loading, setLoading] = React.useState<boolean>();
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    if (!birds.length && !loading) {
      setLoading(true);
      getBirdList().then((apiBirds) => {
        setBirds(apiBirds);
        setLoading(false);
      });
    }
  }, [birds, loading]);

  const filteredBirds = React.useMemo(() => {
    const s = search.toLowerCase();
    return birds.filter(
      (b) =>
        search === "" ||
        b.name.toLowerCase().includes(s) ||
        b.location.toLowerCase().includes(s)
    );
  }, [birds, search]);

  const getCountByCoordinates = React.useCallback(
    (coordinates: LatLng[]) => {
      let count = 0;
      coordinates.forEach((coord) => {
        count += birds.filter(
          ({ lat, lng }) => lat === coord.lat && lng === coord.lng
        ).length;
      });
      return count;
    },
    [birds]
  );

  const coordinates = React.useMemo(() => {
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
        () => ({
          map,
          setMap,
          birds,
          filteredBirds,
          coordinates,
          loading,
          getCountByCoordinates,
          search,
          setSearch,
        }),
        [
          map,
          birds,
          filteredBirds,
          coordinates,
          loading,
          getCountByCoordinates,
          search,
        ]
      )}
    >
      {children}
    </MapContext.Provider>
  );
}

export default function useMapContext() {
  return React.useContext(MapContext);
}
