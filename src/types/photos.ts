export type PhotoSize = {
  source: string;
  height?: number;
  width?: number;
};

export type Metadata = {
  Title: string | null;
  DateTaken: string | null;
  Make: string | null;
  Model: string | null;
  SerialNumber: string | null;
  LensModel: string | null;
  LensSerialNumber: string | null;
  ExposureProgram: string | null;
  ISO: number | null;
  ShutterSpeed: string | null;
  Aperture: string | null;
  FocalLength: string | null;
  GPSLatitude: number | null;
  GPSLongitude: number | null;
  Height: number | null;
  Width: number | null;
};

export type Photo = {
  id: string;
  path: string;
  date: string;
  metadata: Metadata;
  size: PhotoSize;
};

export type Album = {
  slug: string;
  title: string;
  photos: Photo[];
};
