import { Avatar, Box, Container, Grid, Typography } from "@mui/joy";
import Link from "next/link";

export default function Header() {
  return (
    <Container>
      <Grid container spacing={2} paddingTop={2} paddingBottom={4}>
        <Grid xs={6}>
          <Box display="flex" gap={2}>
            <Avatar src="/images/profile.png" />
            <Link href="/">
              <Typography level="title-lg" paddingY={1}>
                Brobin
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box
            display="flex"
            gap={2}
            alignItems="right"
            justifyContent="right"
            paddingY={1}
          >
            <Link href="/photos">
              <Typography level="title-lg">Photos</Typography>
            </Link>
            <Link href="/projects">
              <Typography level="title-lg">Projects</Typography>
            </Link>
            <Link href="/blog">
              <Typography level="title-lg">Blog</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
