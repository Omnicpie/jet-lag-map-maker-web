import type { GameSize } from "../../types/GameSize";
import type { Unit } from "../../types/Unit";
import type { Units as TurfUnit } from "@turf/helpers";

export const getDistanceUnit = (unit: Unit) => {
  if (unit === "metric") return "km";
  if (unit === "imperial") return "mile";
  return "unknown";
};

export const getTurfUnit = (unit: Unit): TurfUnit => {
  if (unit === "metric") return "kilometres";
  if (unit === "imperial") return "miles";
  return "miles";
};

export const getZoneSize = (
  gameSize: GameSize,
  units: Unit,
  customRadius?: number,
) => {
  if (gameSize === "custom") return customRadius || 0;

  if (gameSize === "l") {
    if (units === "metric") return 1;
    return 0.5;
  }

  if (units === "metric") return 0.5;
  return 0.25;
};
