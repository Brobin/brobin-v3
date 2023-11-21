import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import PhotoContainer from "./PhotoContainer";
import { Skeleton } from "@mui/joy";

export default function PhotoSkeleton({ width = 10, height = 8 }) {
  return (
    <PhotoContainer
      title={"loading"}
      size={{ width, height, source: "" }}
      skeleton
    />
  );
}

export function PhotoSkeletonList({ length = 6 }: { length?: number }) {
  const { xs, sm } = useBreakpoints();

  return (
    <ImageList gap={10} cols={xs ? 1 : sm ? 2 : 3}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <ImageListItem key={index}>
            <PhotoSkeleton />
            <ImageListItemBar
              title={<Skeleton variant="text" level="body-lg" width={150} />}
              subtitle={<Skeleton variant="text" level="body-sm" width={100} />}
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}
