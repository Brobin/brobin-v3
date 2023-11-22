import { Fish, Year } from "@brobin/types/fishing";
import fs from "fs";
import path from "path";

const FISHING_PATH = path.join(process.cwd(), "data/fishing");

function getJson(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export function getYears() {
  return fs.readdirSync(FISHING_PATH).map((year) => year.replace(".json", ""));
}

export function getYearData(year: string): Year {
  return getJson(path.join(FISHING_PATH, `${year}.json`));
}

export function getYearsData(): Year[] {
  return getYears()
    .map((year) => getYearData(year))
    .sort((a, b) => a.year - b.year);
}

export function getFishData(): Fish[] {
  return getYearsData().flatMap(({ year, fish }) =>
    fish.map((f) => ({ year, ...f }))
  );
}
