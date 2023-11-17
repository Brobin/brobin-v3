import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import { Album } from "@brobin/types/flickr";
import { getAlbums } from "@brobin/utils/flickr";
import { Divider, Typography } from "@mui/joy";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  albums: Album[];
}

export default function Albums({ albums }: Props) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page title="Photos">
      <Typography level="h1">Photos</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={sm ? 1 : md ? 2 : 3} variant="masonry">
        {albums.map((album) => (
          <ImageListItem
            key={album.id}
            component="a"
            href={`/photos/album/${album.id}`}
          >
            <PhotoContainer title={album.title} size={album.primary} />
            <ImageListItemBar title={`${album.title} (${album.total})`} />
          </ImageListItem>
        ))}
      </ImageList>
    </Page>
  );
}

export async function getServerSideProps() {
  const albums = await getAlbums();
  return { props: { albums } };
}
