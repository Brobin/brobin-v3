export type PhotoParams = { params: { id: string } };

export type PhotoSize = {
  source: string;
  height: number;
  width: number;
};

export type Photo = {
  id: string;
  title: string;
  datetaken: string;
  medium: PhotoSize;
  large: PhotoSize;
  original: PhotoSize;
};

export type PhotoExifData = {
  camera?: string | null;
  lens: string | null;
  exposure: string | null;
  iso: string | null;
  focalLength: string | null;
  aperture: string | null;
};

export type PhotoGeoData = {
  latitude: number;
  longitude: number;
  county: string;
  region: string;
  country: string;
};

export type PhotoDetail = Photo & {
  description: string;
  tags: string[];
  exif: PhotoExifData;
  geo: PhotoGeoData | null;
};
