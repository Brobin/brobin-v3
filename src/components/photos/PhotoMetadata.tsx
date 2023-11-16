import { Photo, PhotoExifData } from "@brobin/types/flickr";
import { Typography } from "@mui/joy";

interface Props {
  photo: Photo;
  exifData: PhotoExifData;
}

export default function PhotoMetadata({ photo, exifData }: Props) {
  return (
    <>
      <Typography level="body-md">{exifData.camera}</Typography>
      <Typography level="body-md">{exifData.lens}</Typography>
      <Typography level="body-md">
        {exifData.exposure}s, <i>f</i>
        {exifData.aperture}, ISO {exifData.iso}, {exifData.focalLength}
      </Typography>
      <Typography>
        {photo.width_o} x {photo.height_o} px
      </Typography>
      {photo.geo_is_public && (
        <Typography>
          {photo.latitude} {photo.longitude}
        </Typography>
      )}
    </>
  );
}
