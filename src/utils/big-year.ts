import { Bird } from "@brobin/types/big-year";
import path from "path";
import { parse } from "papaparse";

const DATA_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQV7GReU_p5r4vYS7jqJzjijqjC5BMKBaP-T1fjDs4OEsniHckux0KQLYGvChl3DBnarfdFy9HWW9Gs/pub?gid=805199429&single=true&output=csv";

export async function getBirdList(): Promise<Bird[]> {
  const birds: Omit<Bird, "id">[] = [];

  await fetch(DATA_URL)
    .then((response) => response.text())
    .then((v) => parse<string[]>(v))
    .then(({ data }) => {
      data.forEach((value) => {
        if (value[2] === "species") {
          birds.push({
            name: String(value[3]),
            location: String(value[6]),
            date: String(value[8]),
            checklistId: String(value[10]),
          });
        }
      });
    })
    .then(() => {})
    .catch((err) => console.log(err));

  return birds.map((bird, i) => ({
    id: birds.length - i,
    ...bird,
  }));
}
