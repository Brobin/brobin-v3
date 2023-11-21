import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { PhotoDetail } from "@brobin/types/flickr";
import {
  Camera,
  CameraAlt,
  Iso,
  Photo,
  ShutterSpeed,
  Visibility,
} from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/joy";

interface Props {
  loading: boolean;
  photo?: PhotoDetail;
}

interface MetadataProps {
  icon: JSX.Element;
  children: any;
  loading: boolean;
}

function Metadata({ icon, children, loading }: MetadataProps) {
  const { xs, sm } = useBreakpoints();
  return (
    <Box
      display="flex"
      gap={1}
      justifyContent={xs || sm ? "start" : "end"}
      flexDirection={xs || sm ? "row" : "row-reverse"}
    >
      {icon}
      {loading ? (
        <Skeleton variant="text" level="body-md" width={200} />
      ) : (
        <Typography level="body-md">
          <span>{children}</span>
        </Typography>
      )}
    </Box>
  );
}

export default function PhotoMetadata({ photo, loading }: Props) {
  return (
    <>
      <Metadata icon={<CameraAlt />} loading={loading}>
        {photo && photo.exif.camera}, {photo && photo.exif.lens?.split(" F")[0]}
      </Metadata>
      <Metadata icon={<ShutterSpeed />} loading={loading}>
        {photo && photo.exif.exposure}s
      </Metadata>
      <Metadata icon={<Camera />} loading={loading}>
        <i>f</i>
        {photo && photo.exif.aperture}
      </Metadata>
      <Metadata icon={<Iso />} loading={loading}>
        <>ISO {photo && photo.exif.iso}</>
      </Metadata>
      <Metadata icon={<Visibility />} loading={loading}>
        {photo && photo.exif.focalLength}
      </Metadata>
      <Metadata icon={<Photo />} loading={loading}>
        {photo && photo.original.width} x {photo && photo.original.height} px
      </Metadata>
    </>
  );
}
