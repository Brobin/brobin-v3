/* eslint-disable @next/next/no-img-element */
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoDescription from "@brobin/components/photos/PhotoDescription";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import { PhotoDetail } from "@brobin/types/flickr";
import { getPhotoDetail } from "@brobin/utils/flickr";
import { Grid } from "@mui/joy";

interface Props {
  photo: PhotoDetail;
}

export default function Photo({ photo }: Props) {
  return (
    <Page title={`${photo.title} | Photos`}>
      <PhotoContainer title={photo.title} size={photo.large} />
      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <PhotoDescription photo={photo} />
        </Grid>
        <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
          <PhotoMetadata photo={photo} />
        </Grid>
      </Grid>
    </Page>
  );
}

interface Params {
  params: { id: string };
}

export async function getServerSideProps({ params: { id } }: Params) {
  const photo = await getPhotoDetail(id);
  return { props: { photo } };
}
