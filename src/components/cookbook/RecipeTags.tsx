import { Box, Chip } from "@mui/joy";

interface Props {
  tags: string[];
  padding?: boolean;
}

export default function RecipeTags({ tags, padding }: Props) {
  return (
    <Box display="flex" gap={1} paddingY={padding ? 2 : 0}>
      {tags.map((tag) => {
        return (
          <Chip variant="solid" key={tag}>
            {tag}
          </Chip>
        );
      })}
    </Box>
  );
}
