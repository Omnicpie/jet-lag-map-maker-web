import Map from "@vis.gl/react-maplibre";
import type { Tab } from "../../types/Tab";
import "./Complete.css";

type CompleteProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Complete = ({ setCurrentTab }: CompleteProps) => {
  const progressPhase = () => {
    setCurrentTab("new");
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className="complete-page">
      <div className="left-side">
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
      <div className="right-side">
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
