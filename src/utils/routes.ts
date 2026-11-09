export const countyUrl = (code: string) =>
  `/birds-of-nebraska/by-county?county=${code}`;

export const speciesUrl = (speciesCode: string) =>
  `/birds-of-nebraska/by-species?species=${speciesCode}`;
