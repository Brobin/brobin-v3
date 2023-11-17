import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import { AlbumDetail } from "@brobin/types/flickr";
import { getAlbumDetail } from "@brobin/utils/flickr";
import { Divider, Typography } from "@mui/joy";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  album: AlbumDetail;
}

export default function Album({ album }: Props) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page title={`${album.title} | Photos`}>
      <Typography level="h1">{album.title}</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={sm ? 1 : md ? 2 : 3} variant="masonry">
        {album.photos.map((photo) => (
          <ImageListItem
            key={photo.id}
            component="a"
            href={`/photos/photo/${photo.id}`}
          >
            <PhotoContainer title={photo.title} size={photo.medium} />
            <ImageListItemBar title={photo.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Page>
  );
}

interface Params {
  params: { id: string };
}

export async function getServerSideProps({ params: { id } }: Params) {
  const album = await getAlbumDetail(id);
  return { props: { album } };
}
