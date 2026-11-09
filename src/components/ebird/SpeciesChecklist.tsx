import {
  Box,
  Button,
  GlobalStyles,
  IconButton,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Close from "@mui/icons-material/Close";
import Print from "@mui/icons-material/Print";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import NextLink from "next/link";
import React from "react";

import { Taxonomy } from "@brobin/types/ebird";
import { speciesUrl } from "@brobin/utils/routes";

export default function SpeciesChecklist({
  birds,
  seen,
  title,
}: {
  birds: Taxonomy[];
  seen: Set<string>;
  /** Heading shown only on the printed page. */
  title?: string;
}) {
  const [query, setQuery] = React.useState("");
  const [seenOnly, setSeenOnly] = React.useState(false);
  const [targetsOnly, setTargetsOnly] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return birds.filter(
      (bird) =>
        (!seenOnly || seen.has(bird.speciesCode)) &&
        (!targetsOnly || !seen.has(bird.speciesCode)) &&
        (!q ||
          `${bird.comName} ${bird.sciName} ${bird.familySciName}`
            .toLowerCase()
            .includes(q)),
    );
  }, [birds, query, seenOnly, targetsOnly, seen]);

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
    <Box className="print-area">
      <GlobalStyles
        styles={{
          "@page": { size: "landscape", margin: "0.4in" },
          "@media print": {
            // drop everything except the checklist and the elements wrapping it
            "body *:not(.print-area, .print-area *, :has(.print-area))": {
              display: "none !important",
            },
            // strip layout from the wrappers so they add no space of their own
            ":has(.print-area)": {
              display: "block !important",
              position: "static !important",
              width: "100% !important",
              maxWidth: "none !important",
              height: "auto !important",
              minHeight: "0 !important",
              margin: "0 !important",
              padding: "0 !important",
              border: "0 !important",
              boxShadow: "none !important",
              background: "none !important",
              overflow: "visible !important",
            },
            ".no-print": { display: "none !important" },
          },
        }}
      />
      {title && (
        <Typography
          level="h2"
          sx={{
            display: "none",
            "@media print": { display: "block", fontSize: "18px" },
          }}
        >
          {title}
        </Typography>
      )}
      <Box
        className="no-print"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
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
          sx={{ maxWidth: 300, flexGrow: 1 }}
        />
        <Button
          size="sm"
          variant={seenOnly ? "solid" : "outlined"}
          aria-pressed={seenOnly}
          onClick={() => {
            setSeenOnly((prev) => !prev);
            setTargetsOnly(false);
          }}
          sx={{ marginLeft: "auto" }}
        >
          Toggle Seen
        </Button>
        <Button
          size="sm"
          variant={targetsOnly ? "solid" : "outlined"}
          aria-pressed={targetsOnly}
          onClick={() => {
            setTargetsOnly((prev) => !prev);
            setSeenOnly(false);
          }}
        >
          Toggle Targets
        </Button>
        <Button
          size="sm"
          variant="soft"
          startDecorator={<Print />}
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>
      {/* printed as columns that fill each page top to bottom, left to right */}
      <Box
        sx={{
          "@media print": {
            columnCount: 5,
            columnGap: "12px",
            columnFill: "auto",
          },
        }}
      >
        {families.map((family) => (
          <Box
            key={family.code}
            sx={{
              // skip the heading too when none of the family was seen
              "@media print": {
                display: family.birds.some((b) => seen.has(b.speciesCode))
                  ? "block"
                  : "none",
              },
            }}
          >
            <Typography
              level="h4"
              sx={{
                marginTop: 3,
                marginBottom: 1,
                "@media print": {
                  fontSize: "12px",
                  lineHeight: 1.2,
                  marginTop: 1,
                  marginBottom: 0.25,
                  breakAfter: "avoid",
                },
              }}
            >
              {family.name}{" "}
              <Typography
                level="body-md"
                fontWeight="normal"
                sx={{ "@media print": { fontSize: "10px" } }}
              >
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
                // the page-level columns do the laying out when printing
                "@media print": { display: "block" },
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
                    "@media print": {
                      // only species seen in the county are printed
                      display: seen.has(bird.speciesCode) ? "flex" : "none",
                      color: "#000",
                      gap: 0.5,
                      marginBottom: 0.25,
                      breakInside: "avoid",
                    },
                  }}
                >
                  {seen.has(bird.speciesCode) ? (
                    <CheckCircle
                      color="success"
                      titleAccess="Seen"
                      sx={{
                        marginTop: 0.5,
                        "@media print": { display: "none" },
                      }}
                    />
                  ) : (
                    <RadioButtonUnchecked
                      color="disabled"
                      titleAccess="Not seen"
                      sx={{
                        marginTop: 0.5,
                        "@media print": { display: "none" },
                      }}
                    />
                  )}
                  {/* printed in place of the icons, to be filled in by hand */}
                  <Box
                    sx={{
                      display: "none",
                      "@media print": {
                        display: "block",
                        flexShrink: 0,
                        width: "14px",
                        height: "10px",
                        borderBottom: "1px solid #000",
                      },
                    }}
                  />
                  <Box>
                    <Typography
                      level="title-md"
                      component="span"
                      display="block"
                      title={
                        bird.extinct
                          ? `Extinct${
                              bird.extinctYear ? ` (${bird.extinctYear})` : ""
                            }`
                          : undefined
                      }
                      sx={{
                        textDecoration: bird.extinct
                          ? "line-through"
                          : undefined,
                        "@media print": { fontSize: "10px", lineHeight: 1.2 },
                      }}
                    >
                      {bird.comName}
                    </Typography>
                    <Typography
                      level="body-sm"
                      component="span"
                      display="block"
                      sx={{ "@media print": { display: "none" } }}
                    >
                      <i>{bird.sciName}</i>
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
