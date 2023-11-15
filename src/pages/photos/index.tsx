/* eslint-disable @next/next/no-img-element */
import { Photo } from "@brobin/types/flickr";
import { getPhotos } from "@brobin/utils/flickr";
import { Info } from "@mui/icons-material";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Photos",
};

interface Props {
  photos: Photo[];
}

export default function Photos({ photos }: Props) {
  return (
    <>
      <ImageList gap={10} cols={3} variant="masonry">
        {photos.map((photo) => (
          <ImageListItem
            key={photo.id}
            component="a"
            href={`/photos/${photo.id}`}
          >
            <img src={photo.url_l} alt={photo.title} />
            <ImageListItemBar title={photo.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export async function getServerSideProps() {
  const photos = await getPhotos();
  return { props: { photos } };
}
