import { Recipe } from "@brobin/types/cookbook";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

const COOKBOOK_PATH = path.join(process.cwd(), "data/recipes");

function getYaml(path: string) {
  return yaml.load(fs.readFileSync(path, "utf-8")) as Omit<Recipe, "slug">;
}

export function getRecipeSlugs(): string[] {
  return fs
    .readdirSync(COOKBOOK_PATH)
    .map((recipe) => recipe.replace(".yaml", ""));
}

export function getRecipe(slug: string): Recipe {
  return { ...getYaml(path.join(COOKBOOK_PATH, `${slug}.yaml`)), slug };
}

export function getRecipes(): Recipe[] {
  return getRecipeSlugs().map((slug) => getRecipe(slug));
}
