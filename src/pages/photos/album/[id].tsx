import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { getStaticPaths } from "@brobin/pages/blog/[...slug]";
import { AlbumDetail } from "@brobin/types/flickr";
import { getAlbumDetail } from "@brobin/utils/flickr";
import { Divider, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  album: AlbumDetail;
}

export default function Album({ album }: Props) {
  const { xs, sm } = useBreakpoints();

  return (
    <Page
      title={`${album.title} | Photos`}
      description={`Photos of ${album.title}`}
      image={album.photos[0].medium}
    >
      <Typography level="h1">{album.title}</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={xs ? 1 : sm ? 2 : 3}>
        {album.photos.map((photo) => (
          <ImageListItem
            key={photo.id}
            component="a"
            href={`/photos/photo/${photo.id}`}
          >
            <PhotoContainer title={photo.title} size={photo.medium} />
            <ImageListItemBar
              title={photo.title}
              subtitle={dayjs(photo.datetaken).format("MMMM DD, YYYY")}
            />
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
