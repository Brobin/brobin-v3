/* eslint-disable @next/next/no-img-element */
import MobileDivider from "@brobin/components/MobileDivider";
import Page from "@brobin/components/Page";
import Taxonomy from "@brobin/components/Taxonomy";
import TypographySkeleton from "@brobin/components/TypographySkeleton";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import PhotoMetadata from "@brobin/components/photos/PhotoMetadata";
import PhotoSkeleton from "@brobin/components/photos/PhotoSkeleton";
import { PhotoDetail } from "@brobin/types/flickr";
import { Taxon } from "@brobin/types/inaturalist";
import { Divider, Grid, Skeleton, Typography } from "@mui/joy";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import React from "react";

interface Props {
  id: string;
}

const PhotoMap = dynamic(() => import("@brobin/components/photos/PhotoMap"), {
  ssr: false,
});

export default function Photo({ id }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [photo, setPhoto] = React.useState<PhotoDetail>();
  const [taxonomy, setTaxonomy] = React.useState<Taxon[] | undefined>();

  React.useEffect(() => {
    fetch(`/api/photos/photo/${id}`)
      .then((res) => res.json())
      .then(({ photo, taxonomy }) => {
        setPhoto(photo);
        setTaxonomy(taxonomy);
        setLoading(false);
      });
  }, [id]);

  const taxon = React.useMemo(
    () => (taxonomy && taxonomy.length ? taxonomy[taxonomy?.length - 1] : null),
    [taxonomy]
  );

  const title = React.useMemo(() => {
    return photo ? `${photo.title} ${taxon && `(${taxon.name})`}` : null;
  }, [photo, taxon]);

  return (
    <Page
      title={title ? `${title} • Photos` : "Photos"}
      description={photo && photo.description}
      image={photo && photo.medium}
    >
      {photo ? (
        <PhotoContainer title={photo.title} size={photo.large} fullSize />
      ) : (
        <PhotoSkeleton width={6} height={4} />
      )}

      <Grid container paddingTop={2} paddingBottom={6} spacing={2}>
        <Grid xs={12} md={8}>
          <TypographySkeleton loading={loading} level="h3">
            {title}
          </TypographySkeleton>
          <TypographySkeleton loading={loading} level="body-sm" width={300}>
            {photo && dayjs(photo.datetaken).format("MMMM DD, YYYY h:MM A")}
          </TypographySkeleton>

          {photo && photo.geo && (
            <Typography level="body-sm">
              {photo.geo.county} County, {photo.geo.region}, {photo.geo.country}
            </Typography>
          )}

          <TypographySkeleton
            loading={loading}
            level="body-lg"
            marginTop={2}
            width={600}
          >
            {photo?.description}
          </TypographySkeleton>

          <Divider sx={{ marginY: 2 }} />

          {loading ? (
            <>
              <Skeleton level="body-xs" variant="text" />
              <Skeleton level="body-sm" variant="text" />
            </>
          ) : (
            <>{taxonomy && <Taxonomy taxonomy={taxonomy} />}</>
          )}
        </Grid>

        <Grid xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
          <PhotoMetadata photo={photo} loading={loading} />
          <MobileDivider />
        </Grid>

        {photo && photo.geo && (
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
  return { props: { id } };
}
