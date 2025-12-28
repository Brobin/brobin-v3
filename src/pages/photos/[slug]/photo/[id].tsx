/* eslint-disable @next/next/no-img-element */
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import Taxonomy from "@brobin/components/Taxonomy";
import { Taxon } from "@brobin/types/inaturalist";
import { Photo } from "@brobin/types/photos";
import { searchTaxonomy } from "@brobin/utils/inaturalist";
import { getPhoto } from "@brobin/utils/photos";
import { Divider, Grid, Typography } from "@mui/joy";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

interface Props {
  photo: Photo;
  taxonomy: Taxon[];
}

const PhotoMap = dynamic(() => import("@brobin/components/photos/PhotoMap"), {
  ssr: false,
});

export default function PhotoPage({ photo, taxonomy }: Props) {
  const taxon = taxonomy.length ? taxonomy[taxonomy?.length - 1] : null;

  return (
    <Page title={`${photo.metadata.Title} • Photos`} image={photo.size}>
      <PhotoContainer
        title={photo.metadata.Title ?? ""}
        size={photo.size}
        fullSize
      />

      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <Typography level="h3">
            {photo.metadata.Title}
            {taxon ? <i> ({taxon.name})</i> : ""}
          </Typography>

          <Typography level="body-sm" suppressHydrationWarning>
            <span suppressHydrationWarning>
              {photo.date
                ? dayjs(photo.metadata.DateTaken).format("MMMM DD, YYYY h:MM A")
                : ""}
            </span>
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Taxonomy taxonomy={taxonomy} />
        </Grid>

        <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
          <PhotoMetadata metadata={photo.metadata} />
          <MobileDivider />
        </Grid>

        {photo.metadata.GPSLatitude && photo.metadata.GPSLongitude && (
          <Grid xs={12}>
            <PhotoMap
              latitude={photo.metadata.GPSLatitude}
              longitude={photo.metadata.GPSLongitude}
            />
          </Grid>
        )}
      </Grid>
    </Page>
  );
}

interface Params {
  params: { slug: string; id: string };
}

export async function getServerSideProps({ params: { slug, id } }: Params) {
  const photo = getPhoto(slug, `${id}.JPG`);
  const taxonomy =
    slug.includes("wildlife") && photo.metadata.Title
      ? await searchTaxonomy(photo.metadata.Title)
      : [];
  return { props: { photo, taxonomy } };
}
