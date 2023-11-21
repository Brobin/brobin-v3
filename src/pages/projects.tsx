import Page from "@brobin/components/Page";
import { Button, Card, Grid, Typography } from "@mui/joy";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: string;
  link: string;
  buttonText?: string;
}

function Project({ title, description, link, buttonText }: ProjectProps) {
  return (
    <Grid xs={12} md={6}>
      <Card variant="plain" style={{ height: "100%" }}>
        <Typography level="h2" component="a" href={link}>
          {title}
        </Typography>
        <p>{description}</p>
        <Link href={link}>
          <Button variant="soft">{buttonText ?? "View More"}</Button>
        </Link>
      </Card>
    </Grid>
  );
}

export default function Projects() {
  return (
    <Page
      title="Projects"
      description="Some development projects taht I've been working on"
    >
      <Grid container spacing={2}>
        <Project
          title="Photos"
          link="/photos"
          buttonText="View Photos"
          description="A showcase of some of my favorite photos! My goal is to have a good photograph of every bird species I've seen."
        />
        <Project
          title="Fishing Stats"
          link="/fishing"
          buttonText="View Stats"
          description="Yearly fishing stats from the family fishing trip. See how the distribution of fish in Marion Lake has changed over the years."
        />
        <Project
          title="Cookbook"
          link="/cookbook"
          buttonText="Get Cooking!"
          description="Just some of my favorite recipes. By no means a compllete cookbook, but these are recipes that I cook all the time."
        />
      </Grid>
    </Page>
  );
}
