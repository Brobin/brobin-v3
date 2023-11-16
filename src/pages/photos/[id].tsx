/* eslint-disable @next/next/no-img-element */
import Page from "@brobin/components/Page";
import Tags from "@brobin/components/Tags";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoDescription from "@brobin/components/photos/PhotoDescription";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import { Photo, PhotoExifData, PhotoParams } from "@brobin/types/flickr";
import { getPhoto, getPhotoExifData } from "@brobin/utils/flickr";
import { Grid, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
};

interface Props {
  photo: Photo;
  exifData: PhotoExifData;
}

export default function PhotoDetail({ photo, exifData }: Props) {
  return (
    <Page title={photo.title}>
      <PhotoContainer photo={photo} fullSize />
      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <PhotoDescription photo={photo} />
        </Grid>
        <Grid xs={12} md={4} textAlign={"right"}>
          <PhotoMetadata photo={photo} exifData={exifData} />
        </Grid>
      </Grid>
    </Page>
  );
}

export async function getServerSideProps({ params: { id } }: PhotoParams) {
  const photo = await getPhoto(id);
  const exifData = await getPhotoExifData(id);
  return { props: { photo, exifData } };
}
