/* eslint-disable @next/next/no-img-element */
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoDescription from "@brobin/components/photos/PhotoDescription";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { PhotoDetail } from "@brobin/types/flickr";
import { getPhotoDetail } from "@brobin/utils/flickr";
import { Divider, Grid } from "@mui/joy";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

interface Props {
  photo: PhotoDetail;
}

const PhotoMap = dynamic(() => import("@brobin/components/photos/PhotoMap"), {
  ssr: false,
});

export default function Photo({ photo }: Props) {
  const { xs, sm } = useBreakpoints();
  return (
    <Page
      title={`${photo.title} | Photos`}
      description={`${photo.title}, ${dayjs(photo.datetaken).format(
        "MMMM DD, YYYY"
      )}`}
      image={photo.medium}
    >
      <PhotoContainer title={photo.title} size={photo.large} fullSize />
      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <PhotoDescription photo={photo} />
          <MobileDivider />
        </Grid>
        <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
          <PhotoMetadata photo={photo} />
          <MobileDivider />
        </Grid>
        {photo.geo && (
          <Grid xs={12}>
            <PhotoMap data={photo.geo} />
          </Grid>
        )}
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
