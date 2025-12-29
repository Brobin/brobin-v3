export type Bird = {
  id: number;
  name: string;
  location: string;
  date: string;
  lat: number;
  lng: number;
  photoId: number | null;
  audioId: number | null;
  lifeBird: boolean;
  stateBird: boolean;
};

export type Month = {
  month: number;
  name: string;
  species: number;
  yearBirds: number;
  stateBirds: number;
  lifeBirds: number;
  miles: number;
  cost: number;
};
