import { Article } from "@brobin/types/blog";
import { Box, Card, Chip, Divider, Typography } from "@mui/joy";
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
        <Link href={article.link} key={article.slug}>
          {article.title}
        </Link>
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
