import { Box, Chip } from "@mui/joy";

interface Props {
  tags: string[];
  padding?: boolean;
}

export default function Tags({ tags, padding }: Props) {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" paddingY={padding ? 1 : 0}>
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
