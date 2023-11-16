import { PhotoDetail } from "@brobin/types/flickr";
import { Typography } from "@mui/joy";

interface Props {
  photo: PhotoDetail;
}

export default function PhotoMetadata({ photo }: Props) {
  return (
    <>
      <Typography level="body-md">{photo.exif.camera}</Typography>
      <Typography level="body-md">{photo.exif.lens}</Typography>
      <Typography level="body-md">
        {photo.exif.exposure}s, <i>f</i>
        {photo.exif.aperture}, ISO {photo.exif.iso}, {photo.exif.focalLength}
      </Typography>
      <Typography>
        {photo.original.width} x {photo.original.height} px
      </Typography>
    </>
  );
}
