/* eslint-disable @next/next/no-img-element */
import Page from "@brobin/components/Page";
import { Photo } from "@brobin/types/flickr";
import { getPhotos } from "@brobin/utils/flickr";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Metadata } from "next";

interface Props {
  photos: Photo[];
}

export default function Photos({ photos }: Props) {
  return (
    <Page title="Photos">
      <ImageList gap={10} cols={3} variant="masonry">
        {photos.map((photo) => (
          <ImageListItem
            key={photo.id}
            component="a"
            href={`/photos/${photo.id}`}
          >
            <img
              src={photo.url_l}
              alt={photo.title}
              style={{ borderRadius: "5px" }}
            />
            <ImageListItemBar title={photo.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Page>
  );
}

export async function getServerSideProps() {
  const photos = (await getPhotos()).sort((a, b) =>
    new Date(b.datetaken) > new Date(a.datetaken) ? 1 : -1
  );
  return { props: { photos } };
}
