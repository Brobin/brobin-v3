export type RecipeParams = { params: { slug: string } };

export type Recipe = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  ingredients: string[];
  method: string[];
};
