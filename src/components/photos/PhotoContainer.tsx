/* eslint-disable @next/next/no-img-element */
import { Photo } from "@brobin/types/flickr";
import { AspectRatio } from "@mui/joy";
import { Fade } from "@mui/material";

interface Props {
  photo: Photo;
  fullSize?: boolean;
}

export default function PhotoContainer({ photo, fullSize }: Props) {
  return (
    <AspectRatio
      variant="soft"
      ratio={`${photo.width_o}/${photo.height_o}`}
      sx={{ borderRadius: "5px" }}
    >
      <Fade in timeout={{ enter: 1000 }}>
        <img
          src={fullSize ? photo.url_l : photo.url_m}
          alt={photo.title}
          style={{ borderRadius: "5px", pointerEvents: "none" }}
        />
      </Fade>
    </AspectRatio>
  );
}
