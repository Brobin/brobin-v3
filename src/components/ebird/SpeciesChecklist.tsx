import { Box, Checkbox, IconButton, Input, Link, Typography } from "@mui/joy";
import Close from "@mui/icons-material/Close";
import NextLink from "next/link";
import React from "react";

import { Taxonomy } from "@brobin/types/ebird";
import { speciesUrl } from "@brobin/utils/routes";

export default function SpeciesChecklist({
  birds,
  seen,
}: {
  birds: Taxonomy[];
  seen: Set<string>;
}) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? birds.filter((bird) =>
          `${bird.comName} ${bird.sciName}`.toLowerCase().includes(q),
        )
      : birds;
  }, [birds, query]);

  return (
    <>
      <Input
        size="sm"
        placeholder="Search species"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        endDecorator={
          query && (
            <IconButton
              size="sm"
              variant="plain"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <Close />
            </IconButton>
          )
        }
        sx={{ maxWidth: 300, marginBottom: 2 }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          rowGap: 2,
          columnGap: 3,
        }}
      >
        {filtered.map((bird) => (
          <Box
            key={bird.speciesCode}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Checkbox
              checked={seen.has(bird.speciesCode)}
              readOnly
              sx={{ marginTop: 0.5 }}
            />
            <Box>
              <Link
                component={NextLink}
                href={speciesUrl(bird.speciesCode)}
                level="title-lg"
                underline="none"
                textColor="text.primary"
              >
                {bird.comName}
              </Link>
              <Typography level="body-sm">
                <i>{bird.sciName}</i>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
