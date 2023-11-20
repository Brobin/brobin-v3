/* eslint-disable @next/next/no-img-element */
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import Taxonomy from "@brobin/components/Taxonomy";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import { PhotoDetail } from "@brobin/types/flickr";
import { Taxon } from "@brobin/types/inaturalist";
import { getPhotoDetail } from "@brobin/utils/flickr";
import { searchTaxonomy } from "@brobin/utils/inaturalist";
import { Divider, Grid, Typography } from "@mui/joy";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

interface Props {
  photo: PhotoDetail;
  taxonomy: Taxon[];
}

const PhotoMap = dynamic(() => import("@brobin/components/photos/PhotoMap"), {
  ssr: false,
});

export default function Photo({ photo, taxonomy }: Props) {
  const taxon = taxonomy.length ? taxonomy[taxonomy?.length - 1] : null;

  return (
    <Page
      title={`${photo.title}${taxon && ` (${taxon.name})`} • Photos`}
      description={photo.description}
      image={photo.medium}
    >
      <PhotoContainer title={photo.title} size={photo.large} fullSize />

      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <Typography level="h3">
            {photo.title} {taxon && <i>({taxon.name})</i>}
          </Typography>

          <Typography level="body-sm">
            {dayjs(photo.datetaken).format("MMMM DD, YYYY h:MM A")}
          </Typography>
          {photo.geo && (
            <Typography level="body-sm">
              {photo.geo.county} County, {photo.geo.region}, {photo.geo.country}
            </Typography>
          )}
          <Typography level="body-lg" marginTop={2}>
            {photo.description}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Taxonomy taxonomy={taxonomy} />
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
  const taxonomy = await searchTaxonomy(photo.title);
  return { props: { photo, taxonomy } };
}
