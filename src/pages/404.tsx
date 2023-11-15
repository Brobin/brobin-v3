import { Box, Typography } from "@mui/joy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <Box my={15} textAlign="center">
      <Typography level="h1" fontSize={50}>
        404
      </Typography>
      <Typography level="body-lg">Page Not Found</Typography>
    </Box>
  );
}
