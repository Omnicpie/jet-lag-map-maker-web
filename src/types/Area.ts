import type { BoundaryType } from "./BoundaryType";
import type { Feature, Polygon, GeoJsonProperties } from "geojson";

export type Area = {
  name: string;
  value: BoundaryType | "custom";
  data?: Feature<Polygon, GeoJsonProperties>;
};
