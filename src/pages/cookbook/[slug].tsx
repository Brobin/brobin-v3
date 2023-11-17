import Page from "@brobin/components/Page";
import Tags from "@brobin/components/Tags";
import { Recipe, RecipeParams } from "@brobin/types/cookbook";
import { getRecipe, getRecipeSlugs } from "@brobin/utils/cookbook";
import { ReduceCapacitySharp } from "@mui/icons-material";
import { Box, Card, Divider, Grid, List, ListItem, Typography } from "@mui/joy";

interface Props {
  recipe: Recipe;
}

export default function CookbookRecipe({ recipe }: Props) {
  return (
    <Page title={`${recipe.title} | Cookbook`} description={recipe.description}>
      <Typography level="h1">{recipe.title}</Typography>
      <Tags tags={recipe.tags} padding />
      <Typography level="body-md">{recipe.description}</Typography>
      <Box paddingY={2}>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        <Grid sm={4}>
          <Card variant="plain">
            <Typography level="h4">Ingredients</Typography>
            <List marker="disc">
              {recipe.ingredients.map((ingredient) => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid sm={8}>
          <Card variant="plain">
            <Typography level="h4">Method</Typography>
            <List marker="decimal">
              {recipe.method.map((step) => (
                <ListItem key={step}>{step}</ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: getRecipeSlugs().map((slug) => `/cookbook/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: RecipeParams) {
  return {
    props: {
      recipe: getRecipe(slug),
    },
  };
}
