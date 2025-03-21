import { Observation } from "@brobin/types/ebird";

const apiToken = process.env.EBIRD_API_TOKEN as string;

export async function getRareBirds(): Promise<Observation[]> {
  const observations: Observation[] = await fetch(
    "https://api.ebird.org/v2/data/obs/US-NE/recent/notable?detail=full&back=2",
    { headers: { "X-eBirdApiToken": apiToken } }
  )
    .then((response) => response.json())
    .then((observations) =>
      observations.sort((a: Observation, b: Observation) => {
        if (a.subId > b.subId) return 1;
        if (a.subId < b.subId) return -1; // Get the first obs for each
        return 0;
      })
    )
    .catch((error) => console.log(error));

  let uniqueObservations: Observation[] = [];

  // Remove duplicates from shared checklists
  observations.forEach((obs) => {
    let exists = uniqueObservations.some(
      (u) => u.obsDt === obs.obsDt && u.comName === obs.comName
    );
    if (!exists) {
      uniqueObservations.push(obs);
    }
  });

  // Order by date desc
  return uniqueObservations.sort((a, b) => {
    if (a.obsDt > b.obsDt) return 1;
    if (a.obsDt < b.obsDt) return -1;
    return 0;
  });
}
