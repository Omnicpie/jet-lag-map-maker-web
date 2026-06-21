import type { StationResult } from "../../types/StationResult";

export const upsert = (array: StationResult[], element: StationResult) => {
  const copy = [...array];
  const i = copy.findIndex((e) => e.name === element.name);
  if (i > -1)
    copy[i] = element; // (2)
  else copy.push(element);

  return copy;
};
