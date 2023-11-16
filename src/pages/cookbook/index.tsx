import Page from "@brobin/components/Page";
import Tags from "@brobin/components/Tags";
import { Recipe } from "@brobin/types/cookbook";
import { getRecipes } from "@brobin/utils/cookbook";
import { Box, Card, Divider, Grid, Typography } from "@mui/joy";

interface Props {
  recipes: Recipe[];
}

export default function Cookbook({ recipes }: Props) {
  return (
    <Page title="Cookbook">
      <Typography level="h1">Tobin&apos;s Cookbook</Typography>
      <Typography level="body-md">Just some of my favorite recipes.</Typography>
      <Box paddingY={2}>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid md={6} key={recipe.title}>
            <Card variant="plain" style={{ height: "100%" }}>
              <Typography
                level="h3"
                component="a"
                href={`/cookbook/${recipe.slug}`}
              >
                {recipe.title}
              </Typography>
              <Tags tags={recipe.tags} />
              <Typography level="body-md">{recipe.description}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      recipes: getRecipes(),
    },
  };
}
