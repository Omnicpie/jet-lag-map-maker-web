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
import { useState } from "react";
import type { StationResult } from "../../types/StationResult";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import useResults from "../../hooks/useResults/useResults";

const Complete = () => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mapOpen, setMapOpen] = useState(false);
  const [showStations, setShowStations] = useState(true);
  const [showHidingZones, setShowHidingZones] = useState(true);
  const { calculatedStations: stations } = useResults();
  const [popupInfo, setPopupInfo] = useState<StationResult | undefined>();

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
            <div className="map-action">
              Show stations
              <ToggleSwitch
                checked={showStations}
                handleChange={setShowStations}
              />
            </div>
            <div className="map-action">
              Show hiding zones
              <ToggleSwitch
                checked={showHidingZones}
                handleChange={setShowHidingZones}
                disabled
              />
            </div>
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
              ? "https://api.maptiler.com/maps/019d9342-d80e-77bf-b55c-cbff099f30f3/style.json?key=DADVHIhWafeGl3MV00CL"
              : "https://api.maptiler.com/maps/019d9342-c125-7d89-a536-728e04bcfef6/style.json?key=DADVHIhWafeGl3MV00CL"
          }
        >
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />
          {showStations
            ? stations.map((station) => (
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
              ))
            : null}

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
