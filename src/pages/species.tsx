import Page from "@brobin/components/Page";
import { RankLevel, UserTaxon } from "@brobin/types/inaturalist";
import { titleCase } from "@brobin/utils";
import { getUserTaxonomy } from "@brobin/utils/inaturalist";
import { Card, Typography } from "@mui/joy";
import React from "react";
import styles from "./species.module.scss";

interface Props {
  taxa: UserTaxon[];
}

function Taxon({ taxon, hide = false }: { taxon: UserTaxon; hide?: boolean }) {
  const mainTaxon = taxon.rank_level % 10 === 0;

  const show = mainTaxon || taxon.rank_level <= RankLevel.Species;

  const [collapsed, setCollapsed] = React.useState(
    taxon.rank_level < 60 && taxon.name !== "Aves"
  );

  return show ? (
    <li>
      <Typography
        level="body-md"
        display="inline"
        className={styles.expand}
        onClick={() => setCollapsed(!collapsed)}
      >
        {taxon.common_name ? titleCase(taxon.common_name) : taxon.name}
      </Typography>{" "}
      {taxon.rank_level > 10 && (
        <>
          <Typography level="body-sm" display="inline">
            ({titleCase(taxon.rank)} {taxon.name})
          </Typography>{" "}
          <Typography level="body-md" display="inline">
            ({taxon.species_count})
          </Typography>
        </>
      )}
      {!collapsed && (
        <ul className={styles.nested}>
          {taxon.children?.map((child) => (
            <Taxon key={child.id} taxon={child} />
          ))}
        </ul>
      )}
    </li>
  ) : (
    <>
      {taxon.children?.map((child) => (
        <Taxon key={child.id} taxon={child} />
      ))}
    </>
  );
}

export default function Species({ taxa }: Props) {
  return (
    <Page title="species">
      <Card variant="plain" className={styles.tree}>
        <ul>
          {taxa.map((taxon) => (
            <Taxon key={taxon.id} taxon={taxon} />
          ))}
        </ul>
      </Card>
    </Page>
  );
}

export async function getServerSideProps() {
  const taxa = await getUserTaxonomy(
    process.env.INATURALISR_USER_ID as string,
    process.env.INATURALIST_USERNAME as string
  );
  return { props: { taxa } };
}
