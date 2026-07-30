import type { StationData } from "uk-railway-stations";
import Google from "../../api/google/Google";
import type { LookupOptions } from "../../types/LookupOptions";
import type { StationResult } from "../../types/StationResult";
import { GOOGLE_STATION_TYPES } from "../constants/constants";
import type { GoogleGeocode } from "../../types/Google";

const toStatioResult = (r: GoogleGeocode, s: string): StationResult => ({
  name: s,
  found: {
    lat: r.geometry.location.lat,
    lon: r.geometry.location.lng,
    name: "",
    code: "",
  },
});
const toStationData = (r: GoogleGeocode): StationData => ({
  lat: r.geometry.location.lat,
  long: r.geometry.location.lng,
  stationName: "",
  crsCode: "",
});

export const findStations = async (
  station: string,
  options: LookupOptions,
): Promise<StationResult[]> => {
  if (!options.apiKey) return [];

  const response = await Google.geocode(options.apiKey, station);

  const results = response?.results;
  if (!results) return [];

  const trainStationResults = results.filter((res) =>
    res.types.some((type) => GOOGLE_STATION_TYPES.includes(type)),
  );

  return trainStationResults.map((s) => toStatioResult(s, station));
};

export const findStation = async (
  station: string,
  options: LookupOptions,
): Promise<StationResult | null> => {
  const stations = await findStations(station, options);
  return stations[0] || null;
};

export const findStationByLatLong = async (
  lat: number,
  long: number,
  options: LookupOptions,
): Promise<StationData | null> => {
  if (!options.apiKey) return null;
  const combined = `${lat},${long}`;

  const response = await Google.reverseGeocode(options.apiKey, combined);

  const results = response?.results;
  if (!results) return null;

  const trainStationResults = results.filter((res) =>
    res.types.some((type) => GOOGLE_STATION_TYPES.includes(type)),
  );

  const stations = trainStationResults.map((s) => toStationData(s));

  return stations[0];
};
