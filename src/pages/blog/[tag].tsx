import { TagParams } from "@brobin/types/blog";
import { getArticles, getBlogSidebar, getTags } from "@brobin/utils/blog";
import Blog from ".";

export default Blog;

export async function getStaticPaths() {
  return { paths: getTags().map((tag) => `/blog/${tag}`), fallback: false };
}

export async function getStaticProps({ params: { tag } }: TagParams) {
  return { props: { articles: getArticles(tag), tag, ...getBlogSidebar() } };
}
