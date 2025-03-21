import { Observation } from "@brobin/types/ebird";

const apiToken = process.env.EBIRD_API_TOKEN as string;

export async function getRareBirds(): Promise<Observation[]> {
  const observations: Observation[] = await fetch(
    "https://api.ebird.org/v2/data/obs/US-NE/recent/notable?detail=full&back=2",
    { headers: { "X-eBirdApiToken": apiToken } }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));

  let uniqueObservations: Observation[] = [];

  observations.forEach((obs) => {
    let exists = uniqueObservations.filter(
      (u) => u.obsDt === obs.obsDt && u.comName === obs.comName
    ).length;
    if (!exists) {
      uniqueObservations.push(obs);
    }
  });

  return uniqueObservations;
}
