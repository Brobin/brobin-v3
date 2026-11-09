import { Box, IconButton, Input, Link, Typography } from "@mui/joy";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Close from "@mui/icons-material/Close";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
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
          `${bird.comName} ${bird.sciName} ${bird.familySciName}`
            .toLowerCase()
            .includes(q),
        )
      : birds;
  }, [birds, query]);

  // birds arrive in taxon order, so each family is a contiguous run
  const families = React.useMemo(() => {
    const groups: {
      code: string;
      name: string;
      sciName: string;
      birds: Taxonomy[];
    }[] = [];
    for (const bird of filtered) {
      const last = groups[groups.length - 1];
      if (last?.code === bird.familyCode) {
        last.birds.push(bird);
      } else {
        groups.push({
          code: bird.familyCode,
          name: bird.familyComName,
          sciName: bird.familySciName,
          birds: [bird],
        });
      }
    }
    return groups;
  }, [filtered]);

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
        sx={{ maxWidth: 300 }}
      />
      {families.map((family) => (
        <React.Fragment key={family.code}>
          <Typography level="h4" sx={{ marginTop: 3, marginBottom: 1 }}>
            {family.name}{" "}
            <Typography level="body-md" fontWeight="normal">
              &ndash; <i>{family.sciName}</i>
            </Typography>
          </Typography>
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
            {family.birds.map((bird) => (
              <Link
                key={bird.speciesCode}
                component={NextLink}
                href={speciesUrl(bird.speciesCode)}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                {seen.has(bird.speciesCode) ? (
                  <CheckCircle
                    color="success"
                    titleAccess="Seen"
                    sx={{ marginTop: 0.5 }}
                  />
                ) : (
                  <RadioButtonUnchecked
                    color="disabled"
                    titleAccess="Not seen"
                    sx={{ marginTop: 0.5 }}
                  />
                )}
                <Box>
                  <Typography level="title-md" component="span" display="block">
                    {bird.comName}
                  </Typography>
                  <Typography level="body-sm" component="span" display="block">
                    <i>{bird.sciName}</i>
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </React.Fragment>
      ))}
    </>
  );
}
