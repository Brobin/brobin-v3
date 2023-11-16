import Page from "@brobin/components/Page";
import ArticlePreview from "@brobin/components/blog/ArticlePreview";
import BlogSidebar from "@brobin/components/blog/Sidebar";
import { Article, BlogSidebarProps } from "@brobin/types/blog";
import { getArticles, getBlogSidebar } from "@brobin/utils/blog";
import { Grid, Typography } from "@mui/joy";

type BlogProps = {
  articles: Article[];
  tag?: string;
} & BlogSidebarProps;

export default function Blog({ articles, tag, ...props }: BlogProps) {
  return (
    <Page title={tag ? `${tag} | Blog` : "Blog"}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          {tag && (
            <Typography level="h2" paddingBottom={2}>
              Posts tagged &quot;{tag}&quot;
            </Typography>
          )}
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </Grid>
        <Grid xs={12} md={4}>
          <BlogSidebar {...props} />
        </Grid>
      </Grid>
    </Page>
  );
}

export async function getStaticProps() {
  return { props: { articles: getArticles(), ...getBlogSidebar() } };
}
