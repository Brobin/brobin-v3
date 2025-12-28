import useBreakpoints from "@brobin/hooks/useBreakpoints";
import { Metadata } from "@brobin/types/photos";
import {
  Camera,
  CameraAlt,
  Iso,
  ShutterSpeed,
  Visibility,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/joy";

interface Props {
  metadata: Metadata;
}

interface MetadataProps {
  icon: JSX.Element;
  children: any;
}

function MetadataDisplay({ icon, children }: MetadataProps) {
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

export default function PhotoMetadata({ metadata }: Props) {
  return (
    <>
      {metadata.Model && (
        <MetadataDisplay icon={<CameraAlt />}>
          {metadata.Model}, {metadata.LensModel}
        </MetadataDisplay>
      )}
      {metadata.ShutterSpeed && (
        <MetadataDisplay icon={<ShutterSpeed />}>
          {metadata.ShutterSpeed}s
        </MetadataDisplay>
      )}
      {metadata.Aperture && (
        <MetadataDisplay icon={<Camera />}>
          <i>f</i>
          {metadata.Aperture}
        </MetadataDisplay>
      )}

      {metadata.ISO && (
        <MetadataDisplay icon={<Iso />}>
          <>ISO {metadata.ISO}</>
        </MetadataDisplay>
      )}
      {metadata.FocalLength && (
        <MetadataDisplay icon={<Visibility />}>
          {metadata.FocalLength}
        </MetadataDisplay>
      )}
    </>
  );
}
