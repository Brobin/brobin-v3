/* eslint-disable @next/next/no-img-element */
import Page from "@brobin/components/Page";
import Tags from "@brobin/components/Tags";
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
      <img src={photo.url_o} alt={photo.title} style={{ maxWidth: "100%" }} />
      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <Typography level="h3">{photo.title}</Typography>
          <Typography level="body-sm">
            {dayjs(photo.datetaken).format("MMMM DD, YYYY h:MM A")}
          </Typography>
          <Typography level="body-md">{photo.description._content}</Typography>
          <Tags tags={photo.tags.split(" ")} padding />
        </Grid>
        <Grid xs={12} md={4} textAlign={"right"}>
          <Typography level="body-md">{exifData.camera}</Typography>
          <Typography level="body-md">{exifData.lens}</Typography>
          <Typography level="body-md">
            {exifData.exposure}s, <i>f</i>
            {exifData.aperture}, ISO {exifData.iso}, {exifData.focalLength}
          </Typography>
          <Typography>
            {photo.width_o} x {photo.height_o} px
          </Typography>
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
