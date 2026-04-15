import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from "@vis.gl/react-maplibre";
import "./Complete.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faTable } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { csvToJsonRegex } from "../../utils/parse/parse.utils";
import type { StationResult } from "../../types/StationResult";

const Complete = () => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mapOpen, setMapOpen] = useState(false);
  const [stations, setStations] = useState<StationResult[]>([]);
  const [popupInfo, setPopupInfo] = useState<StationResult | undefined>();

  useEffect(() => {
    fetch("stations.csv")
      .then((res) => {
        res.text().then((data) => {
          const x = JSON.parse(csvToJsonRegex(data));
          setStations(
            // @ts-expect-error not typed, mock data
            x.map((val) => ({
              name: val.name,
              found: { name: val.name, lon: val.longitude, lat: val.latitude },
            })),
          );
        });
      })
      .catch(console.error);
  }, []);

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
          maxPitch={0}
          style={{ width: "100%", height: "100%" }}
          mapStyle={
            prefersDark
              ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
              : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          }
        >
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />
          {stations.map((station) => (
            <Marker
              latitude={station.found.lat}
              longitude={station.found.lon}
              key={station.found.name}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(station);
              }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "2px 2px #88888820",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                  }}
                />
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.found.lon)}
              latitude={Number(popupInfo.found.lat)}
              onClose={() => setPopupInfo(undefined)}
            >
              <div className="popup-content">
                <p>
                  <b>
                    [{popupInfo.found.code}] {popupInfo.found.name}
                  </b>
                </p>
                <p>
                  {popupInfo.found.lat}, {popupInfo.found.lon}
                </p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Complete;
