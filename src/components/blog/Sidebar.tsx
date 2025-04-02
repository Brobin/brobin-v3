import { Article } from "@brobin/types/blog";
import { Box, Card, Chip, Divider, Typography } from "@mui/joy";
import dayjs from "dayjs";
import Link from "next/link";

type BlogSidebarProps = {
  recent: Article[];
  tags: string[];
};

export default function BlogSidebar({ recent, tags }: BlogSidebarProps) {
  return (
    <Card variant="plain">
      <Typography level="title-lg">Recent Posts</Typography>
      {recent.map((article) => (
        <div key={article.slug}>
          <Divider />
          <Typography level="title-md" paddingBottom={0} paddingTop={2}>
            <Link href={article.link}>{article.title}</Link>
          </Typography>
          <Typography level="body-sm" paddingBottom={2}>
            {dayjs(article.date).format("MMMM DD, YYYY")}
          </Typography>
        </div>
      ))}
      <Divider />
      <Typography level="title-lg">Tags</Typography>
      <Box display="flex" gap={1}>
        {tags.map((tag) => {
          return (
            <Chip
              variant="solid"
              key={tag}
              slotProps={{ action: { component: "a", href: `/blog/${tag}` } }}
            >
              {tag}
            </Chip>
          );
        })}
      </Box>
    </Card>
  );
}
