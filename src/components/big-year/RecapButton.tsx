import { Button, Grid } from "@mui/joy";

export default function RecapButton({
  name,
  href,
}: {
  name: string;
  href?: string;
}) {
  return (
    <Grid xs={4} md={4} lg={4}>
      <Button
        sx={{ width: "100%" }}
        href={href}
        component="a"
        variant="outlined"
        disabled={!href}
      >
        {name}
      </Button>
    </Grid>
  );
}
