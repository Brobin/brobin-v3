import Page from "@brobin/components/Page";
import ArticleMarkdown from "@brobin/components/blog/ArticleMarkdown";
import BlogSidebar from "@brobin/components/blog/Sidebar";
import { Article, ArticleParams, BlogSidebarProps } from "@brobin/types/blog";
import {
  getArticleBySlug,
  getArticlePaths,
  getBlogSidebar,
} from "@brobin/utils/blog";
import { Card, Divider, Grid, Typography } from "@mui/joy";
import dayjs from "dayjs";

type ArticleProps = {
  article: Article;
} & BlogSidebarProps;

export default function ArticlePage({ article, ...props }: ArticleProps) {
  return (
    <Page title={article.title}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Card variant="plain">
            <Typography level="h1">{article.title}</Typography>
            <Typography level="title-sm" paddingBottom={2}>
              {dayjs(article.date).format("MMMM DD, YYYY")}
            </Typography>
            <Divider />
            <ArticleMarkdown content={article.content} />
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <BlogSidebar {...props} />
        </Grid>
      </Grid>
    </Page>
  );
}

export async function getStaticPaths() {
  return { paths: getArticlePaths(), fallback: false };
}

export async function getStaticProps({ params: { slug } }: ArticleParams) {
  // last element in slug array is the actual slug
  return {
    props: {
      article: getArticleBySlug(slug[slug.length - 1]),
      ...getBlogSidebar(),
    },
  };
}
