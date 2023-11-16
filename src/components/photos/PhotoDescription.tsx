import { PhotoDetail } from "@brobin/types/flickr";
import { Typography } from "@mui/joy";
import dayjs from "dayjs";
import Tags from "../Tags";

interface Props {
  photo: PhotoDetail;
}

export default function PhotoDescription({ photo }: Props) {
  return (
    <>
      <Typography level="h3">{photo.title}</Typography>
      <Typography level="body-sm">
        {dayjs(photo.datetaken).format("MMMM DD, YYYY h:MM A")}
      </Typography>
      {photo.geo && (
        <Typography level="body-sm">
          {photo.geo.county} County, {photo.geo.region}, {photo.geo.country}
        </Typography>
      )}
      <Typography level="body-lg">{photo.description}</Typography>
      <Tags tags={photo.tags} padding />
    </>
  );
}
