import type { StationData } from "uk-railway-stations";
import Google from "../../api/google/Google";
import type { LookupOptions } from "../../types/LookupOptions";
import type { StationResult } from "../../types/StationResult";

export const findStations = (
  station: string,
  options: LookupOptions,
): StationResult[] => {
  return [];
};

export const findStation = (
  station: string,
  options: LookupOptions,
): StationResult | null => {
  const stations = findStations(station, options);
  return stations[0] || null;
};

export const findStationByLatLong = (
  lat: number,
  long: number,
  options: LookupOptions,
): StationData | null => {
  return null;
};
