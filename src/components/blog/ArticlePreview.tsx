import { Article } from "@brobin/types/blog";
import { Box, Card, Typography } from "@mui/joy";
import dayjs from "dayjs";
import Link from "next/link";

export default function ArticlePreview({ article }: { article: Article }) {
  const date = dayjs(article.date).format("MMMM DD, YYYY");

  return (
    <Box paddingBottom={2}>
      <Card variant="plain">
        <Link href={article.link}>
          <Typography level="h3">{article.title}</Typography>
        </Link>
        <Typography level="body-sm">{date}</Typography>
        <Typography>{article.preview}</Typography>
      </Card>
    </Box>
  );
}
