import { type StationData } from "uk-railway-stations";
import type { StationResult } from "../../types/StationResult";
import * as GoogleLookup from "./google-lookup.utils";
import * as NPMLookup from "./npm-lookup.utils";
import type { LookupOptions } from "../../types/LookupOptions";

const Provider = {
  google: GoogleLookup,
  npm: NPMLookup,
  nominatim: NPMLookup, // TODO Change me to the real one
};

export const findStations = (
  station: string,
  options: LookupOptions,
): Promise<StationResult[]> => {
  return Provider[options.provider].findStations(station, options);
};

export const findStation = (
  station: string,
  options: LookupOptions,
): Promise<StationResult | null> => {
  return Provider[options.provider].findStation(station, options);
};

export const findStationByLatLong = (
  lat: number,
  long: number,
  options: LookupOptions,
): Promise<StationData | null> => {
  return Provider[options.provider].findStationByLatLong(lat, long, options);
};
