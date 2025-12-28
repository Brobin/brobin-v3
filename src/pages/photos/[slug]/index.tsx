import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import styles from "@brobin/components/photos/PhotoContainer.module.scss";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Album } from "@brobin/types/photos";
import { getAlbum, getAlbums } from "@brobin/utils/photos";
import { Divider, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  album: Album;
}

export default function AlbumPage({ album }: Props) {
  const { xs, sm } = useBreakpoints();

  return (
    <Page
      title={`${album.title} • Photos`}
      description={`Photos of ${album.title}`}
      image={{ source: album.photos[0].path }}
    >
      <Typography level="h1">{album.title}</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={xs ? 1 : sm ? 2 : 3}>
        {album.photos.map((photo) => (
          <ImageListItem
            key={photo.id}
            component="a"
            href={`/photos/${album.slug}/photo/${photo.id}`}
            className={styles.zoom}
          >
            <PhotoContainer
              title={photo.metadata.Title ?? photo.id}
              size={photo.size}
            />
            <ImageListItemBar
              title={photo.metadata.Title ?? photo.id}
              subtitle={
                <span suppressHydrationWarning>
                  {photo.date ? dayjs(photo.date).format("MMMM DD, YYYY") : ""}
                </span>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Page>
  );
}

interface Params {
  params: { slug: string };
}

export function getStaticPaths() {
  return {
    paths: getAlbums().map((album) => `/photos/${album.slug}`),
    fallback: false,
  };
}

export function getStaticProps({ params: { slug } }: Params) {
  const album = getAlbum(slug);
  return { props: { album } };
}
