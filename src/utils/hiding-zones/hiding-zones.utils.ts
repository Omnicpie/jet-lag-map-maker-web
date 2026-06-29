import { circle } from "@turf/turf";
import type { GameOptions } from "../../types/GameOptions";
import type { HidingZone } from "../../types/HidingZone";
import type { StationResult } from "../../types/StationResult";
import { getTurfUnit, getZoneSize } from "../units/units.utils";

export const calculateZones = (
  stations: StationResult[],
  options: GameOptions,
): HidingZone[] => {
  return stations.map((station) => {
    const center = [station.found.lat, station.found.lon];
    const radius = getZoneSize(
      options.gamesize,
      options.units,
      options.customRadius,
    );
    const units = getTurfUnit(options.units);
    return circle(center, radius, { steps: 100, units });
  });
};
