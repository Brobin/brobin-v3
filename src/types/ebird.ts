export type Observation = {
  comName: string;
  sciName: string;
  locId: string;
  locName: string;
  lat: number;
  lng: number;
  obsDt: string;
  howMany?: number;
  obsValid: boolean;
  obsReviewed: boolean;
  locationPrivate: boolean;
  subnational2Code: string;
  subnational2Name: string; // County
  userDisplayName: string;
  subId: string; // checklist ID
  obsId: string; // checklist ID
  presenceNoted: boolean; // X number
};
