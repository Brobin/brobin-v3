/* eslint-disable @next/next/no-img-element */
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import Taxonomy from "@brobin/components/Taxonomy";
import { Taxon } from "@brobin/types/inaturalist";
import { Photo } from "@brobin/types/photos";
import { searchTaxonomy } from "@brobin/utils/inaturalist";
import { getAlbums, getPhoto } from "@brobin/utils/photos";
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
    <Page title={`${photo.exifTags.Title} • Photos`} image={photo.size}>
      <PhotoContainer
        title={photo.exifTags.Title ?? ""}
        size={photo.size}
        fullSize
      />

      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <Typography level="h3">
            {photo.exifTags.Title}
            {taxon ? <i> ({taxon.name})</i> : ""}
          </Typography>

          <Typography level="body-sm" suppressHydrationWarning>
            <span suppressHydrationWarning>
              {dayjs(photo.exifTags.DateTaken).format("MMMM DD, YYYY h:MM A")}
            </span>
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Taxonomy taxonomy={taxonomy} />
        </Grid>

        <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
          <PhotoMetadata exifTags={photo.exifTags} />
          <MobileDivider />
        </Grid>

        {photo.exifTags.GPSLatitude && photo.exifTags.GPSLongitude && (
          <Grid xs={12}>
            <PhotoMap
              latitude={photo.exifTags.GPSLatitude}
              longitude={photo.exifTags.GPSLongitude}
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
    slug.includes("wildlife") && photo.exifTags.Title
      ? await searchTaxonomy(photo.exifTags.Title)
      : [];
  return { props: { photo, taxonomy } };
}
