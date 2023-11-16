export type PhotoParams = { params: { id: string } };

export type Photo = {
  id: string;
  title: string;
  description: {
    _content: string;
  };
  datetaken: string;
  url_m: string;
  url_l: string;
  url_o: string;
  height_o: number;
  width_o: number;
  tags: string;
  geo_is_public?: number;
  latitude: string;
  longitude: string;
};

export type PhotoExifData = {
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  iso: string | null;
  focalLength: string | null;
  aperture: string | null;
};
