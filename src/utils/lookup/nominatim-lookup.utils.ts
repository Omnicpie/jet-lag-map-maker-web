import { type StationData } from "uk-railway-stations";
import type { StationResult } from "../../types/StationResult";
import type { LookupOptions } from "../../types/LookupOptions";
import Nominatim from "../../api/nominatim/Nominatim";
import { NOMINATIM_STATION_TYPES } from "../constants/constants";
import type { NominatimSearchResult } from "../../types/Nominatim";

const toStatioResult = (
  r: NominatimSearchResult,
  s: string,
): StationResult => ({
  name: s,
  found: {
    lat: Number(r.lat),
    lon: Number(r.lon),
    name: r.name,
    code: "",
  },
});
const toStationData = (r: NominatimSearchResult): StationData => ({
  lat: Number(r.lat),
  long: Number(r.lon),
  stationName: r.name,
  crsCode: "",
});

export const findStations = async (
  station: string,
): Promise<StationResult[]> => {
  const results = await Nominatim.search(station);

  if (!results) return [];

  const trainStationResults = results.filter((res) =>
    NOMINATIM_STATION_TYPES.includes(res.type),
  );

  return trainStationResults.map((s) => toStatioResult(s, station));
};

export const findStation = async (
  station: string,
  options: LookupOptions,
): Promise<StationResult | null> => {
  return null;
};

export const findStationByLatLong = async (
  lat: number,
  long: number,
  options: LookupOptions,
): Promise<StationData | null> => {
  return null;
};
