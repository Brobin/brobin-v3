import { Box, CircularProgress } from "@mui/joy";

export default function Loading() {
  return (
    <Box textAlign="center" paddingY={4}>
      <CircularProgress
        sx={{
          "--CircularProgress-size": "100px",
          "--CircularProgress-trackThickness": "10px",
          "--CircularProgress-progressThickness": "10px",
        }}
      />
    </Box>
  );
}
