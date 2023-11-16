/* eslint-disable @next/next/no-img-element */
import Loading from "@brobin/components/Loading";
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import { Photo } from "@brobin/types/flickr";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";

export default function Photos() {
  const [photos, setPhotos] = React.useState<Photo[] | undefined>();

  React.useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then(setPhotos);
  }, []);

  return (
    <Page title="Photos">
      {photos ? (
        <ImageList gap={10} cols={3} variant="masonry">
          {photos.map((photo) => (
            <ImageListItem
              key={photo.id}
              component="a"
              href={`/photos/${photo.id}`}
            >
              <PhotoContainer photo={photo} size={photo.medium} />
              <ImageListItemBar
                title={photo.title}
                sx={{ display: { xs: "none", md: "block" } }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Loading />
      )}
    </Page>
  );
}
