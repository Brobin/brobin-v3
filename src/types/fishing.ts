export type YearParams = { params: { year: string } };

export enum Species {
  Bass = "bass",
  Northern = "northern",
  Walleye = "walleye",
}

export type Day = {
  bass: number;
  northern: number;
  walleye: number;
  day: string;
};

export type Year = {
  year: number;
  days: Day[];
};

export type Fish = {
  year: number;
  species: Species;
  length: number;
  weight: number;
};

export function totalFish(year: Year, species?: Species) {
  return year.days.reduce(
    (sum: number, day: Day) =>
      sum + (species ? day[species] : day.bass + day.northern + day.walleye),
    0
  );
}
