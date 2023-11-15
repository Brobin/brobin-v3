import RecipeTags from "@brobin/components/cookbook/RecipeTags";
import { Recipe } from "@brobin/types/cookbook";
import { getRecipes } from "@brobin/utils/cookbook";
import { Box, Card, Divider, Grid, Typography } from "@mui/joy";

interface Props {
  recipes: Recipe[];
}

export default function Cookbook({ recipes }: Props) {
  return (
    <>
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
              <RecipeTags tags={recipe.tags} />
              <Typography level="body-md">{recipe.description}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      recipes: getRecipes(),
    },
  };
}
