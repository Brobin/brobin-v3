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
import { Box, Typography } from "@mui/joy";

interface Props {
  photo: PhotoDetail;
}

interface MetadataProps {
  icon: JSX.Element;
  children: any;
}

function Metadata({ icon, children }: MetadataProps) {
  const { xs, sm } = useBreakpoints();
  return (
    <Box
      display="flex"
      gap={1}
      justifyContent={xs || sm ? "start" : "end"}
      flexDirection={xs || sm ? "row" : "row-reverse"}
    >
      {icon}
      <Typography level="body-md">
        <span>{children}</span>
      </Typography>
    </Box>
  );
}

export default function PhotoMetadata({ photo }: Props) {
  return (
    <>
      <Metadata icon={<CameraAlt />}>
        {photo.exif.camera}, {photo.exif.lens?.split(" F")[0]}
      </Metadata>
      <Metadata icon={<ShutterSpeed />}>{photo.exif.exposure}s</Metadata>
      <Metadata icon={<Camera />}>
        <i>f</i>
        {photo.exif.aperture}
      </Metadata>
      <Metadata icon={<Iso />}>
        <>ISO {photo.exif.iso}</>
      </Metadata>
      <Metadata icon={<Visibility />}>{photo.exif.focalLength}</Metadata>
      <Metadata icon={<Photo />}>
        {photo.original.width} x {photo.original.height} px
      </Metadata>
    </>
  );
}
