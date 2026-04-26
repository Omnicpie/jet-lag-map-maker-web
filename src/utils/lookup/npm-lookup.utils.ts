import stations from "uk-railway-stations";
import type { StationResult } from "../../types/StationResult";

export const findStation = (station: string): StationResult | null => {
  const needle = station.toLowerCase();
  const matches = stations.filter(
    (s) => s.stationName.toLowerCase() === needle,
  );
  const matches2 = stations.filter(
    (s) => s.stationName.toLowerCase() === needle.replaceAll("-", " "),
  );

  const matches3 = stations.filter(
    (s) => s.stationName.toLowerCase() === needle.split(" ")[0],
  );

  const matches4 = stations.filter((s) =>
    s.stationName.toLowerCase().includes(needle),
  );

  const finalMatches =
    matches.length > 0
      ? matches
      : matches2.length > 0
        ? matches2
        : matches4.length > 0
          ? matches4
          : matches3;

  if (finalMatches.length === 0) {
    return null;
  }

  return finalMatches.map((s) => ({
    name: station,
    found: {
      name: s.stationName,
      lat: s.lat,
      lon: s.long,
      code: s.crsCode,
    },
  }))[0];
};
