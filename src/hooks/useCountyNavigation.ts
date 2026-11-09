import { useRouter } from "next/router";

import { RegionWithSpecies } from "@brobin/types/ebird";
import { countyUrl } from "@brobin/utils/routes";

/** Returns a handler that navigates to the by-county page for a county name. */
export function useCountyNavigation(counties: RegionWithSpecies[]) {
  const router = useRouter();

  return (name: string) => {
    const county = counties.find((c) => c.name === name);
    if (county) {
      router.push(countyUrl(county.code));
    }
  };
}
