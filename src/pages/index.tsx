import Page from "@brobin/components/Page";
import { Box, Card, Typography } from "@mui/joy";

export default function Index() {
  return (
    <Page
      title="Tobin Brown"
      description="Full-stack web developer and amateur wildlife photographer"
    >
      <Box maxWidth={800} margin="auto">
        <Box textAlign="center" py={15}>
          <Typography level="h1" fontSize={50}>
            Tobin Brown
          </Typography>
        </Box>
        <Box pb={15}>
          <Card variant="plain">
            <Typography level="h2">About Me</Typography>
            <Typography level="body-lg">
              I am a full-stack web developer based in Lincoln, Nebraska. My
              hobbies include Wildlife photography, Birding, Gravel/Mountain
              biking, Board Games, and Cooking.
            </Typography>
            <Typography level="body-lg">
              In 2023 I got into birding, followed shortly by bird and wildlife
              photography, and it has since consumed most of my free time. In
              2025 I set out to do a Nebraska Big Year, and set a new state
              record.
            </Typography>
          </Card>
        </Box>
      </Box>
    </Page>
  );
}
