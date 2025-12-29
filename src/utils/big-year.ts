import { Bird } from "@brobin/types/big-year";
import birds from "../../data/big-year/birdList.json";

export function getBirdList(): Bird[] {
  // reverse order
  return [...birds].sort((a, b) => {
    if (a.id > b.id) return -1;
    if (b.id > a.id) return 1;
    return 0;
  });
}
