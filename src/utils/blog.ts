import { Article, ArticleParams } from "@brobin/types/blog";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const ARTICLE_PATH = path.join(process.cwd(), "data/articles");

const files = fs.readdirSync(ARTICLE_PATH);

function getArticleLink(dateString: string, slug: string) {
  const date = dayjs(dateString);
  return `/blog/${date.format("YYYY")}/${date.format("MM")}/${slug}`;
}

function getArticle(filename: string): Article {
  const file = fs.readFileSync(path.join(ARTICLE_PATH, filename), "utf-8");
  const { data, content } = matter(file);
  const slug = filename.replace(".md", "");

  return {
    ...data,
    content,
    slug,
    tags: data.tags.split(", "),
    image: data.image || null,
    draft: data.draft || false,
    link: getArticleLink(data.date, slug),
  } as Article;
}

export function getArticleBySlug(slug: string): Article {
  return getArticle(`${slug}.md`);
}

export function getArticles(tag?: string): Article[] {
  return files
    .map((filename) => ({ ...getArticle(filename) }))
    .filter((article) => tag === undefined || article.tags.includes(tag))
    .filter((article) => !article.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getArticlePaths(): ArticleParams[] {
  return files.map((filename) => {
    const article = getArticle(filename);
    const date = dayjs(article.date);
    return {
      params: {
        slug: [date.format("YYYY"), date.format("MM"), article.slug],
      },
    };
  });
}

function getRecentArticles(tag?: string): Article[] {
  return getArticles(tag).slice(0, 5);
}

export function getTags(tag?: string): string[] {
  const tags = getArticles(tag).flatMap((article) => article.tags);
  return Array.from(new Set(tags)).sort();
}

export function getBlogSidebar(tag?: string) {
  return {
    recent: getRecentArticles(tag).filter((article) => !article.draft),
    tags: getTags(tag),
  };
}
