import { Taxon } from "@brobin/types/inaturalist";
import { titleCase } from "@brobin/utils";
import { Box, Divider, Link, Tooltip, Typography } from "@mui/joy";

interface Props {
  taxonomy: Taxon[];
}

export default function Taxonomy({ taxonomy }: Props) {
  return (
    taxonomy.length > 1 && (
      <>
        <Typography level="body-lg">Taxonomy</Typography>
        <Box display="flex" gap={2} flexWrap="wrap" marginTop={2}>
          {taxonomy.map((taxon) => (
            <Tooltip
              key={taxon.id}
              title={taxon.preferred_common_name}
              variant="plain"
              placement="top"
            >
              <div>
                <Typography level="body-xs">
                  <i>{titleCase(taxon.rank)}</i>
                </Typography>
                <Typography level="body-sm">
                  <Link
                    href={taxon.wikipedia_url}
                    target="_blank"
                    color="neutral"
                    underline="always"
                  >
                    {taxon.name}
                  </Link>
                </Typography>
              </div>
            </Tooltip>
          ))}
        </Box>
        <Divider sx={{ marginY: 2 }} />
      </>
    )
  );
}
