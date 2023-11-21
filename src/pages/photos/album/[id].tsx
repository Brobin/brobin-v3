import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import { PhotoSkeletonList } from "@brobin/components/photos/PhotoSkeleton";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { AlbumDetail } from "@brobin/types/flickr";
import { Divider, Skeleton, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

interface Props {
  id: string;
}

export default function Album({ id }: Props) {
  const { xs, sm } = useBreakpoints();
  const [album, setAlbum] = React.useState<AlbumDetail | undefined>();

  React.useEffect(() => {
    fetch(`/api/photos/album/${id}`)
      .then((res) => res.json())
      .then(({ album }) => setAlbum(album));
  }, [id]);

  return (
    <Page
      title={album ? `${album.title} • Photos` : "Photos"}
      description={album && `Photos of ${album.title}`}
      image={album && album.photos[0].medium}
    >
      <Typography level="h1">{album ? album.title : <Skeleton />}</Typography>
      <Divider sx={{ marginY: 2 }} />
      {album ? (
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
      ) : (
        <PhotoSkeletonList />
      )}
    </Page>
  );
}

interface Params {
  params: { id: string };
}

export async function getServerSideProps({ params: { id } }: Params) {
  return { props: { id } };
}
