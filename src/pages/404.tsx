import Page from "@brobin/components/Page";
import { Box, Typography } from "@mui/joy";
import { Metadata } from "next";

export default function NotFound() {
  return (
    <Page title="Page Not Found">
      <Box my={15} textAlign="center">
        <Typography level="h1" fontSize={50}>
          404
        </Typography>
        <Typography level="body-lg">Page Not Found</Typography>
      </Box>
    </Page>
  );
}
