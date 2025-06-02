import { Bird } from "@brobin/types/big-year";
import { parse } from "papaparse";

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQV7GReU_p5r4vYS7jqJzjijqjC5BMKBaP-T1fjDs4OEsniHckux0KQLYGvChl3DBnarfdFy9HWW9Gs/pub?gid=1575599260&single=true&output=csv";

export async function getBirdList(): Promise<Bird[]> {
  const birds: Bird[] = [];

  await fetch(DATA_URL)
    .then((response) => response.text())
    .then((v) => parse<string[]>(v))
    .then(({ data }) => {
      data.forEach((value, i) => {
        if (value[0] !== "" && value[4] && value[5]) {
          birds.push({
            id: Number(value[0]),
            date: String(value[1]),
            name: String(value[2]),
            location: String(value[3]),
            lat: Number(value[4]),
            lng: Number(value[5]),
          });
        }
      });
    })
    .then(() => {})
    .catch((err) => console.log(err));

  return birds.sort((a, b) => {
    if (a.id > b.id) return -1;
    if (b.id > a.id) return 1;
    return 0;
  });
}
