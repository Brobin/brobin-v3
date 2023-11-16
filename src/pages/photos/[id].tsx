/* eslint-disable @next/next/no-img-element */
import Loading from "@brobin/components/Loading";
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoDescription from "@brobin/components/photos/PhotoDescription";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import { PhotoDetail, PhotoParams } from "@brobin/types/flickr";
import { getPhotoDetail } from "@brobin/utils/flickr";
import { Grid } from "@mui/joy";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id: string;
}

export default function PhotoDetail({ id }: Props) {
  const [photo, setPhoto] = React.useState<PhotoDetail | undefined>();

  React.useEffect(() => {
    fetch(`/api/photos/${id}`)
      .then((res) => res.json())
      .then(setPhoto);
  }, [id]);

  return (
    <Page title={`Photo ${id}`}>
      {photo ? (
        <>
          <PhotoContainer photo={photo} size={photo.large} />
          <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
            <Grid xs={12} md={8}>
              <PhotoDescription photo={photo} />
            </Grid>
            <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
              <PhotoMetadata photo={photo} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading />
      )}
    </Page>
  );
}

export async function getServerSideProps({ params: { id } }: PhotoParams) {
  const photo = await getPhotoDetail(id);
  return { props: { id } };
}
