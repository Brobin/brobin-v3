import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import styles from "@brobin/components/photos/PhotoContainer.module.scss";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Album } from "@brobin/types/photos";
import { getAlbums } from "@brobin/utils/photos";
import { Divider, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

interface Props {
  albums: Album[];
}

export default function Albums({ albums }: Props) {
  const { xs, sm } = useBreakpoints();

  return (
    <Page
      title="Photography"
      description="I take photos of birds and wildlife. Sometimes they are good."
    >
      <Typography level="h1">Photography</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={xs ? 1 : sm ? 2 : 3}>
        {albums.map((album) => (
          <ImageListItem
            key={album.slug}
            component="a"
            href={`/photos/${album.slug}`}
            className={styles.zoom}
          >
            <PhotoContainer
              title={album.title}
              size={{ source: album.photos[0].path, width: 1200, height: 800 }}
            />
            <ImageListItemBar
              title={album.title}
              subtitle={`${album.photos.length} Photos`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Page>
  );
}

export async function getStaticProps() {
  const albums = getAlbums();
  return { props: { albums } };
}
