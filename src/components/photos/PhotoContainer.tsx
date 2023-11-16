/* eslint-disable @next/next/no-img-element */
import { Photo, PhotoSize } from "@brobin/types/flickr";
import { AspectRatio } from "@mui/joy";
import { Fade } from "@mui/material";

interface Props {
  photo: Photo;
  size: PhotoSize;
}

export default function PhotoContainer({ photo, size }: Props) {
  return (
    <AspectRatio
      variant="soft"
      ratio={`${size.width}/${size.height}`}
      sx={{ borderRadius: "5px" }}
    >
      <Fade in timeout={{ enter: 1000 }}>
        <img
          src={size.source}
          alt={photo.title}
          style={{ borderRadius: "5px", pointerEvents: "none" }}
        />
      </Fade>
    </AspectRatio>
  );
}
