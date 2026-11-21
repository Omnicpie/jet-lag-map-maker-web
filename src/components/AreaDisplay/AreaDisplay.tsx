import { Layer, Source } from "@vis.gl/react-maplibre";

const AreaDisplay = ({ data, fillColor = "#3388ff" }) => {
  return (
    <Source id="area-source" type="geojson" data={data}>
      <Layer
        id="area-fill"
        type="fill"
        paint={{
          "fill-color": fillColor,
          "fill-opacity": 0.3,
        }}
      />
      <Layer
        id="area-outline"
        type="line"
        paint={{
          "line-color": "#2563eb",
          "line-width": 1,
        }}
      />
    </Source>
  );
};

export default AreaDisplay;
