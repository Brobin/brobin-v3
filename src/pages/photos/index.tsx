import Page from "@brobin/components/Page";
import PhotoContainer from "@brobin/components/photos/PhotoContainer";
import { PhotoSkeletonList } from "@brobin/components/photos/PhotoSkeleton";
import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Album } from "@brobin/types/flickr";
import { Divider, Typography } from "@mui/joy";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";

export default function Albums() {
  const { xs, sm } = useBreakpoints();
  const [albums, setAlbums] = React.useState<Album[] | undefined>();

  React.useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then(({ albums }) => setAlbums(albums));
  }, []);

  return (
    <Page
      title="Photos"
      description="I take photos of birds and wildlife. Sometimes they are good."
      image={albums && albums[0].primary}
    >
      <>
        <Typography level="h1">Photos</Typography>
        <Divider sx={{ marginY: 2 }} />
        {albums ? (
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
        ) : (
          <PhotoSkeletonList />
        )}
      </>
    </Page>
  );
}
