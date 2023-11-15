import fs from "fs";
import path from "path";

const FISHING_PATH = path.join("data/fishing");
const YEARS_PATH = path.join(FISHING_PATH, "years");

function getJson(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

export function getYears() {
  return fs.readdirSync(YEARS_PATH).map((year) => year.replace(".json", ""));
}

export function getYearData(year: string) {
  return getJson(path.join(YEARS_PATH, `${year}.json`));
}

export function getYearsData() {
  return getYears()
    .map((year) => getYearData(year))
    .sort((a, b) => a.year - b.year);
}

export function getFishData() {
  return getJson(path.join(FISHING_PATH, "fish.json"));
}
