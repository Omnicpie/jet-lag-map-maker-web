import { useCallback, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Confirm.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import ResultsDesktop from "./ResultsDesktop/ResultsDesktop";
import ResultsMobile from "./ResultsMobile/ResultsMobile";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StationResult } from "../../types/StationResult";
import Button from "../../components/Button/Button";
import useResults from "../../hooks/useResults/useResults";
import { createPortal } from "react-dom";
import StationForm from "./StationForm/StationForm";
import { upsert } from "../../utils/array/array.utils";
import useSettings from "../../hooks/useSettings/useSettings";
import { calculateZones } from "../../utils/hiding-zones/hiding-zones.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faTable } from "@fortawesome/free-solid-svg-icons";
import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "@vis.gl/react-maplibre";

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const [open, setOpen] = useState<StationResult | undefined>();
  const [popupInfo, setPopupInfo] = useState<StationResult | undefined>();
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [form, setForm] = useState<
    { stationName: string; current?: StationResult } | undefined
  >();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const {
    failedStations,
    calculatedStations,
    setCalculatedStations,
    setFailedStations,
    setHidingZones,
  } = useResults();
  const options = useSettings();

  const progressPhase = () => {
    const zones = calculateZones(calculatedStations, options);
    setHidingZones(zones);
    setCurrentTab("complete");
  };

  const handleConfirmStation = useCallback(
    (station: StationResult) => {
      if (failedStations.includes(station.name)) {
        setFailedStations(failedStations.filter((s) => s !== station.name));
      }

      setCalculatedStations(upsert(calculatedStations, station));
      setForm(undefined);
    },
    [
      failedStations,
      calculatedStations,
      setCalculatedStations,
      setFailedStations,
    ],
  );

  return (
    <div className="confirm-page">
      <div className="header">
        <div className="left-side">
          <h2>Results</h2>
          <span>
            {calculatedStations.length}/
            {calculatedStations.length + failedStations.length} Stations encoded
          </span>
        </div>
        <div className="mobile-menu" onClick={() => setMapOpen((p) => !p)}>
          <FontAwesomeIcon
            icon={mapOpen ? faTable : faMap}
            size="2xl"
            className=""
          />
        </div>

        <Button
          onClick={progressPhase}
          label="Confirm"
          className="confirm-button"
        />
      </div>
      <div className="content">
        <div className={`left${mapOpen ? "" : " open"}`}>
          <div className="failed-results">
            <h3>Failed Lookups</h3>
            <ul>
              {failedStations.map((item) => (
                <li key={item}>
                  {item}{" "}
                  <Button
                    label="Add"
                    onClick={() => setForm({ stationName: item })}
                    className="small"
                  />
                </li>
              ))}
            </ul>
            {failedStations.length === 0 ? <span>None :)</span> : null}
          </div>
          <div className="results">
            <h3>Stations</h3>
            {isMobile ? (
              <ResultsMobile
                items={calculatedStations}
                setOpen={setOpen}
                setForm={setForm}
                open={open}
              />
            ) : (
              <ResultsDesktop
                items={calculatedStations}
                setOpen={setOpen}
                setForm={setForm}
                open={open}
              />
            )}
          </div>
        </div>
        <div className={`right${mapOpen ? " open" : ""}`}>
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
                ? "https://api.maptiler.com/maps/019de073-e401-7694-8732-d9d20ce78f0a/style.json?key=2RhQVIA8FeGd1TvSEaKb"
                : "https://api.maptiler.com/maps/019de07c-2b05-745a-ae4a-166bc93e3359/style.json?key=2RhQVIA8FeGd1TvSEaKb"
            }
          >
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl />
            {calculatedStations.map((station) => (
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
      {form
        ? createPortal(
            <StationForm
              stationName={form.stationName}
              current={form.current}
              setOpen={setForm}
              handleConfirmStation={handleConfirmStation}
            />,
            //@ts-expect-error portal root could in theory be null, but never will be
            document.getElementById("portal-root"),
          )
        : null}
    </div>
  );
};

export default Confirm;
