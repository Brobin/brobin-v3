import { Grid, Typography } from "@mui/joy";

export default function DataDisclaimer() {
  return (
    <Grid xs={12}>
      <Typography level="body-xs">
        All data is from{" "}
        <a href="https://ebird.org" target="_blank" rel="noreferrer">
          eBird
        </a>{" "}
        and is pulled periodically, so it may not reflect the most recent
        observations.
      </Typography>
    </Grid>
  );
}
