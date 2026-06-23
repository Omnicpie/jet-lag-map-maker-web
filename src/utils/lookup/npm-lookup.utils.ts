import stations, { type StationData } from "uk-railway-stations";
import type { StationResult } from "../../types/StationResult";

export const findStations = (station: string): StationResult[] => {
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
    return [];
  }

  return finalMatches.map((s) => ({
    name: station,
    found: {
      name: s.stationName,
      lat: s.lat,
      lon: s.long,
      code: s.crsCode,
    },
  }));
};

export const findStation = (station: string): StationResult | null => {
  const stations = findStations(station);
  return stations[0] || null;
};

const distanceBetween = (
  station: StationData,
  point: { lat: number; long: number },
) => {
  const distLats = Math.pow(station.lat - point.lat, 2);
  const disLongs = Math.pow(station.long - point.long, 2);
  const distance = Math.sqrt(distLats + disLongs);

  return distance;
};

export const findStationByLatLong = (
  lat: number,
  long: number,
): StationData | null => {
  const boundLimit = 0.01;
  const lats = {
    lowerBound: lat - boundLimit,
    actual: lat,
    upperBound: lat + boundLimit,
  };
  const longs = {
    lowerBound: long - boundLimit,
    actual: long,
    upperBound: long + boundLimit,
  };

  const filterred = stations.filter(
    (station) =>
      station.lat >= lats.lowerBound &&
      station.lat <= lats.upperBound &&
      station.long >= longs.lowerBound &&
      station.long <= longs.upperBound,
  );

  const distanced = filterred.map((station) => ({
    station,
    distance: distanceBetween(station, { lat, long }),
  }));
  const ordered = distanced.toSorted((a, b) => a.distance - b.distance);

  return ordered?.[0]?.station || null;
};
