import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import "./StationForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/Input/Input";
import type { StationResult } from "../../../types/StationResult";
import Button from "../../../components/Button/Button";
import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
  type LngLat,
  type MapLayerMouseEvent,
} from "@vis.gl/react-maplibre";
import useMediaQuery from "../../../hooks/useMediaQuery/useMediaQuery";
import {
  findStationByLatLong,
  findStations,
} from "../../../utils/lookup/lookup.utils";
import useSettings from "../../../hooks/useSettings/useSettings";

type StationFormProps = {
  stationName: string;
  setOpen: Dispatch<
    SetStateAction<{ stationName: string; current?: StationResult } | undefined>
  >;
  handleConfirmStation: (station: StationResult) => void;
  current?: StationResult;
};

const StationForm = ({
  current,
  stationName,
  setOpen,
  handleConfirmStation,
}: StationFormProps) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [stationInput, setStationInput] = useState("");
  const [suggestionsShown, setSuggestionsShow] = useState(false);
  const [selected, setSelected] = useState<StationResult | undefined>();
  const [mapPoint, setMapPoint] = useState<LngLat | null>();
  const [suggestions, setSuggestions] = useState<StationResult[]>([]);
  const { apiKey, lookupTool } = useSettings();

  const clickContent = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleStationChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setStationInput(e.target.value);
  };

  const selectOption = (
    e: MouseEvent<HTMLButtonElement>,
    suggestion: StationResult,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setStationInput(suggestion.found.name);
    setSelected({ ...suggestion, name: stationName });
  };

  const onFocus = () => {
    setSuggestionsShow(true);
  };
  const onBlur = () => {
    setTimeout(() => setSuggestionsShow(false), 200);
  };

  useEffect(() => {
    if (!stationInput) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
    }

    const load = async () => {
      const sugs = await findStations(stationInput, {
        provider: lookupTool,
        apiKey,
      });

      const shrunk = sugs.slice(0, 10);

      setSuggestions(shrunk);
    };

    void load();
  }, [stationInput, apiKey, lookupTool]);

  useEffect(() => {
    if (!mapPoint) return;

    const lookup = async () => {
      const stn = await findStationByLatLong(mapPoint.lat, mapPoint.lng, {
        provider: lookupTool,
        apiKey,
      });
      if (!stn) return;

      setSelected({
        name: stationName,
        found: {
          name: stn?.stationName,
          code: stn?.crsCode,
          lat: stn?.lat,
          lon: stn.long,
        },
      });
      setStationInput(stn?.stationName);
    };

    void lookup();
  }, [mapPoint, stationName, lookupTool, apiKey]);

  const isStationResult = (
    maybe: StationResult | LngLat,
  ): maybe is StationResult => (maybe as StationResult).found !== undefined;

  const confirmStation = (station: StationResult | LngLat) => {
    if (isStationResult(station)) {
      handleConfirmStation(station);
    } else {
      const mapped = {
        name: stationName,
        found: {
          name: stationName,
          code: "",
          lat: station.lat,
          lon: station.lng,
        },
      };
      handleConfirmStation(mapped);
    }
  };

  return (
    <div className="modal-content" onClick={() => setOpen(undefined)}>
      <div className="data-container" onClick={clickContent}>
        <div className="header">
          <h3>{stationName}</h3>
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className="close-button"
            onClick={() => setOpen(undefined)}
          />
        </div>
        <div className="content">
          <div></div>
          <p className="instruction">Enter a station here</p>
          <Input
            value={stationInput}
            onChange={handleStationChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {suggestions.length && suggestionsShown ? (
            <div className="options">
              {suggestions.map((suggestion) => (
                <Button
                  label={suggestion.found.name}
                  onClick={(e) => selectOption(e, suggestion)}
                />
              ))}
            </div>
          ) : null}
          <p className="instruction small">OR</p>
          <p className="instruction">Select on the Map</p>
          <Map
            initialViewState={{
              latitude: 55,
              longitude: -4,
              zoom: 5.5,
            }}
            onClick={(e: MapLayerMouseEvent) => setMapPoint(e.lngLat)}
            maxPitch={0}
            style={{ width: "100%", flex: 1 }}
            mapStyle={
              prefersDark
                ? "https://api.maptiler.com/maps/019de073-e401-7694-8732-d9d20ce78f0a/style.json?key=2RhQVIA8FeGd1TvSEaKb"
                : "https://api.maptiler.com/maps/019de07c-2b05-745a-ae4a-166bc93e3359/style.json?key=2RhQVIA8FeGd1TvSEaKb"
            }
          >
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl />
            {mapPoint ? (
              <Marker latitude={mapPoint.lat} longitude={mapPoint.lng}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xl"
                  className=""
                  color="red"
                />
              </Marker>
            ) : null}
            {selected ? (
              <Marker
                latitude={selected.found.lat}
                longitude={selected.found.lon}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xl"
                  className=""
                  color="purple"
                />
              </Marker>
            ) : null}
            {current ? (
              <Marker
                latitude={current.found.lat}
                longitude={current.found.lon}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xl"
                  className=""
                  color="orange"
                />
              </Marker>
            ) : null}
          </Map>
          <div className="infobox">
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                size="xl"
                className=""
                color="purple"
              />
              Suggested/Input Location
            </span>
            <span>
              <FontAwesomeIcon
                icon={faLocationDot}
                size="xl"
                className=""
                color="red"
              />
              Manually Selected Location
            </span>
            {current ? (
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="xl"
                  className=""
                  color="orange"
                />
                Current Location
              </span>
            ) : null}
          </div>
          <div className="button-group">
            <Button
              label="Use Suggested/Input"
              disabled={!selected}
              onClick={() => confirmStation(selected!)}
            />
            <Button
              label="Use Manual"
              disabled={!mapPoint}
              onClick={() => confirmStation(mapPoint!)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationForm;
