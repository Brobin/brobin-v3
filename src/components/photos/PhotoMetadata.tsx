import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { ExifTags } from "@brobin/types/photos";
import {
  Camera,
  CameraAlt,
  Iso,
  ShutterSpeed,
  Visibility,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/joy";

interface Props {
  exifTags: ExifTags;
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

export default function PhotoMetadata({ exifTags }: Props) {
  return (
    <>
      <Metadata icon={<CameraAlt />}>
        {exifTags.Model}, {exifTags.LensModel}
      </Metadata>
      <Metadata icon={<ShutterSpeed />}>{exifTags.ShutterSpeed}s</Metadata>
      <Metadata icon={<Camera />}>
        <i>f</i>
        {exifTags.Aperture}
      </Metadata>
      <Metadata icon={<Iso />}>
        <>ISO {exifTags.ISO}</>
      </Metadata>
      <Metadata icon={<Visibility />}>{exifTags.FocalLength}</Metadata>
    </>
  );
}
