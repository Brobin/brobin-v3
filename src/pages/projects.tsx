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
      description="Some projects that I've been working on"
    >
      <Grid container spacing={2}>
        <Project
          title="Nebraska Birding Big Year"
          link="/big-year"
          buttonText="View Progress"
          description="I'm trying to see as many birds as I can in one year in the state of Nebraska. Check out my progress!"
        />
        <Project
          title="Photography"
          link="/photos"
          buttonText="View Photos"
          description="I have recently gotten into wildlife photography and birding. Check out some of my favorite photos!"
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
        <Project
          title="Django Seed"
          link="https://github.com/brobin/django-seed"
          buttonText="View on Github"
          description="Django-seed uses the faker library to generate test data for your Django models. This has been forked from django_faker in order to support newer versions of Python and Django Django-seed allows you to write code to generate models, and seed your database with one simple manage.py command!"
        />
        <Project
          title="DRF Generators"
          link="https://github.com/brobin/drf-generators"
          buttonText="View on Github"
          description="Writing APIs can be boring and repetitive work. Don't write another CRUDdy view in Django Rest Framework. With DRF Generators, one simple command will generate all of your Views, Serializers, and even Urls for your Django Rest Framework application!"
        />
      </Grid>
    </Page>
  );
}
