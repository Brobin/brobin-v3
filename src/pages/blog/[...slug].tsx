import Page from "@brobin/components/Page";
import ArticleMarkdown from "@brobin/components/blog/ArticleMarkdown";
import { Article, ArticleParams } from "@brobin/types/blog";
import { getArticleBySlug, getArticlePaths } from "@brobin/utils/blog";
import { Card, Divider, Grid, Typography } from "@mui/joy";
import dayjs from "dayjs";

type ArticleProps = {
  article: Article;
};

export default function ArticlePage({ article, ...props }: ArticleProps) {
  return (
    <Page
      title={article.title}
      description={article.preview}
      image={
        article.image
          ? {
              source: article.image,
            }
          : undefined
      }
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={2}></Grid>
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
    },
  };
}
