declare module "*.geojson" {
  import type { FeatureCollection } from "geojson";

  const data: FeatureCollection;
  export default data;
}
