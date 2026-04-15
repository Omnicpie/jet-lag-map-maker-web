import Map from "@vis.gl/react-maplibre";
import "./Complete.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faTable } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Complete = () => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="complete-page">
      <div className="mobile-menu" onClick={() => setMapOpen((p) => !p)}>
        <FontAwesomeIcon
          icon={mapOpen ? faTable : faMap}
          size="2xl"
          className=""
        />
      </div>
      <div className={`left-side${!mapOpen ? " open" : ""}`}>
        <h2>Files ({2})</h2>
        <table>
          <thead>
            <th>Name</th>
            <th>Size</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr>
              <td>stations.csv</td>
              <td>11 kb</td>
              <td></td>
            </tr>
            <tr>
              <td>hiding-zones.kml</td>
              <td>970 kb</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="map-controls">
          <h4>Map Controls</h4>
          <div className="map-control-inner">
            <div>Show stations</div>
            <div>Show hiding zones</div>
          </div>
        </div>
      </div>
      <div className={`right-side${mapOpen ? " open" : ""}`}>
        <Map
          initialViewState={{
            latitude: 55,
            longitude: -4,
            zoom: 5.2,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={
            prefersDark
              ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
              : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          }
        />
      </div>
    </div>
  );
};

export default Complete;
