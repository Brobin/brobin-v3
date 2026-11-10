import { Autocomplete, Card, Grid, Typography } from "@mui/joy";
import React from "react";

import DataDisclaimer from "@brobin/components/ebird/DataDisclaimer";
import SpeciesChecklist from "@brobin/components/ebird/SpeciesChecklist";
import Page from "@brobin/components/Page";
import { useQueryParam } from "@brobin/hooks/useQueryParam";
import { RegionWithSpecies, TaxonomyWithCount } from "@brobin/types/ebird";
import { getBirds, getCountyLists } from "@brobin/utils/ebird";

interface Props {
  birds: TaxonomyWithCount[];
  counties: RegionWithSpecies[];
}

export default function BirdsOfNebraskaByCounty({ birds, counties }: Props) {
  const [code, setCode] = useQueryParam("county");

  const sortedCounties = React.useMemo(
    () => [...counties].sort((a, b) => a.name.localeCompare(b.name)),
    [counties],
  );

  const selectedCounty = React.useMemo(
    () => counties.find((c) => c.code === code),
    [counties, code],
  );

  const allBirds = React.useMemo(
    () => [...birds].sort((a, b) => a.taxonOrder - b.taxonOrder),
    [birds],
  );

  const seen = React.useMemo(
    () => new Set(selectedCounty?.species),
    [selectedCounty],
  );

  const seenCount = React.useMemo(
    () => allBirds.filter((bird) => seen.has(bird.speciesCode)).length,
    [allBirds, seen],
  );

  const likelyNext = React.useMemo(() => {
    if (!selectedCounty) return [];
    // unseen species, so countyCount never includes the selected county
    return allBirds
      .filter((bird) => !seen.has(bird.speciesCode))
      .map((bird) => ({ bird, count: bird.countyCount }))
      .sort(
        (a, b) => b.count - a.count || a.bird.taxonOrder - b.bird.taxonOrder,
      )
      .slice(0, 10);
  }, [selectedCounty, allBirds, seen]);

  return (
    <Page
      title={
        selectedCounty
          ? `${selectedCounty.name} County Checklist`
          : `Nebraska County Checklists`
      }
      siteTitle={"Birds of Nebraska"}
      description="Nebraska County Checklists"
    >
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="h2">
            {selectedCounty
              ? `${selectedCounty.name} County Checklist`
              : `Nebraska County Checklists`}
          </Typography>
          <Typography level="body-sm">
            Choose a county to see all the species that have been reported.
          </Typography>
        </Grid>
        <Grid xs={12} md={3}>
          <Autocomplete
            placeholder="Search for a county"
            options={sortedCounties}
            value={selectedCounty ?? null}
            getOptionLabel={(county) => county.name}
            isOptionEqualToValue={(a, b) => a.code === b.code}
            onChange={(_, county) => setCode(county?.code ?? null)}
          />
          <br />

          {selectedCounty && (
            <Card variant="plain">
              <Typography level="h3">
                <b>{seenCount}</b> species{" "}
                <Typography component="span" textColor="text.tertiary">
                  ({Math.round((seenCount / birds.length) * 100)}%)
                </Typography>
              </Typography>
              <br />
              {likelyNext.length > 0 && (
                <>
                  <Typography level="title-md">
                    Community target species
                  </Typography>
                  <Typography level="body-xs">
                    Not yet reported in <b>{selectedCounty.name}</b>, but
                    reported in many other counties in the state.
                  </Typography>
                  <ol style={{ margin: 0, paddingLeft: "1.25rem" }}>
                    {likelyNext.map(({ bird, count }) => (
                      <li key={bird.speciesCode}>
                        {count === counties.length - 1 ? (
                          <b>{bird.comName}*</b>
                        ) : (
                          bird.comName
                        )}{" "}
                        <Typography level="body-xs" component="span">
                          ({count} / {counties.length} counties)
                        </Typography>
                      </li>
                    ))}
                  </ol>
                  <Typography level="body-xs">
                    <b>*</b> last county species is needed in!
                  </Typography>
                  <br />
                </>
              )}
              <Typography
                level="body-xs"
                component={"a"}
                href={`https://ebird.org/region/${selectedCounty.code}`}
                target="_blank"
              >
                <i>Data from eBird</i>
              </Typography>
            </Card>
          )}
        </Grid>
        <Grid xs={12} md={9}>
          <Card variant="plain">
            <SpeciesChecklist
              birds={allBirds}
              seen={seen}
              disableActions={!selectedCounty}
              printAll={!selectedCounty}
              title={
                selectedCounty
                  ? `${selectedCounty.name} County Checklist`
                  : `Nebraska Checklist`
              }
            />
          </Card>
        </Grid>
        <DataDisclaimer />
      </Grid>
    </Page>
  );
}

export async function getStaticProps() {
  const counties = await getCountyLists("US-NE");
  const birds = await getBirds("US-NE", counties);

  return { props: { birds, counties } };
}
