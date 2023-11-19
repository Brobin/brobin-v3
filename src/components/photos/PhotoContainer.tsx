/* eslint-disable @next/next/no-img-element */
import { PhotoSize } from "@brobin/types/flickr";
import { AspectRatio, Skeleton } from "@mui/joy";
import { Fade } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  size: PhotoSize;
  fullSize?: boolean;
}

export default function PhotoContainer({ title, size, fullSize }: Props) {
  const ratio = fullSize ? `${size.width}/${size.height}` : "10/8";

  return (
    <AspectRatio variant="soft" ratio={ratio} sx={{ borderRadius: "5px" }}>
      <Fade in timeout={500}>
        <img
          loading="lazy"
          src={size.source}
          alt={title}
          style={{
            borderRadius: "5px",
            pointerEvents: "none",
          }}
        />
      </Fade>
    </AspectRatio>
  );
}
