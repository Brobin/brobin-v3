import { Photo } from "@brobin/types/flickr";
import { Typography } from "@mui/joy";
import dayjs from "dayjs";
import Tags from "../Tags";

interface Props {
  photo: Photo;
}

export default function PhotoDescription({ photo }: Props) {
  return (
    <>
      <Typography level="h3">{photo.title}</Typography>
      <Typography level="body-sm">
        {dayjs(photo.datetaken).format("MMMM DD, YYYY h:MM A")}
      </Typography>
      <Typography level="body-md">{photo.description._content}</Typography>
      <Tags tags={photo.tags.split(" ")} padding />
    </>
  );
}
