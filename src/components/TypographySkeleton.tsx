import { Box, Skeleton, Typography, TypographySystem } from "@mui/joy";

interface Props {
  loading: boolean;
  children?: any | null;
  level: keyof TypographySystem;
  width?: number;
  marginTop?: number;
}

export default function TypographySkeleton({
  loading,
  children,
  level,
  width = 400,
  marginTop = 0,
}: Props) {
  return (
    <Box marginTop={marginTop}>
      {loading ? (
        <Skeleton
          variant="text"
          level={level}
          width={width}
          sx={{
            maxWidth: "100%",
          }}
        />
      ) : (
        <Typography level={level}>{children}</Typography>
      )}
    </Box>
  );
}
