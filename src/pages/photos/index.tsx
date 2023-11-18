import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Album } from "@brobin/types/flickr";
import { getAlbums } from "@brobin/utils/flickr";
import { Divider, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

interface Props {
  albums: Album[];
}

export default function Albums({ albums }: Props) {
  const { xs, sm } = useBreakpoints();

  return (
    <Page
      title="Photos"
      description="I take photos of birds and wildlife. Sometimes they are good."
      image={albums[0].primary}
    >
      <Typography level="h1">Photos</Typography>
      <Divider sx={{ marginY: 2 }} />
      <ImageList gap={10} cols={xs ? 1 : sm ? 2 : 3}>
        {albums.map((album) => (
          <ImageListItem
            key={album.id}
            component="a"
            href={`/photos/album/${album.id}`}
          >
            <PhotoContainer title={album.title} size={album.primary} />
            <ImageListItemBar
              title={album.title}
              subtitle={`${album.total} Photos`}
            />
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
