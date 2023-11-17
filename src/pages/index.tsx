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
          <Typography level="body-lg">
            Full-Stack developer from Nebraska
          </Typography>
        </Box>
        <Box pb={15}>
          <Card variant="plain">
            <Typography level="h2">About Me</Typography>
            <Typography level="body-lg">
              I am a full-stack web developer working for Applied Systems. My
              hobbies include Wildlife photography, Birding, Gravel/Mountain
              biking, Board Games, and Cooking.
            </Typography>
          </Card>
        </Box>
      </Box>
    </Page>
  );
}
