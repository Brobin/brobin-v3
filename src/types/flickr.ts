export type PhotoParams = { params: { id: string } };

export type Photo = {
  id: string;
  title: string;
  description: {
    _content: string;
  };
  datetaken: string;
  url_o: string;
  height_o: number;
  width_o: number;
  url_l: string;
  height_l: number;
  width_l: number;
  tags: string;
};

export type PhotoExifData = {
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  iso: string | null;
  focalLength: string | null;
  aperture: string | null;
};
