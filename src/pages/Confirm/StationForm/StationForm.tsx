import {
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import "./StationForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/Input/Input";
import { findStations } from "../../../utils/lookup/npm-lookup.utils";
import type { StationResult } from "../../../types/StationResult";
import Button from "../../../components/Button/Button";
// import Map, {
//   FullscreenControl,
//   Marker,
//   NavigationControl,
//   Popup,
//   ScaleControl,
// } from "@vis.gl/react-maplibre";
// import useMediaQuery from "../../../../hooks/useMediaQuery/useMediaQuery";

type StationFormProps = {
  stationName: string;
  setOpen: Dispatch<SetStateAction<string | undefined>>;
};

const StationForm = ({ stationName, setOpen }: StationFormProps) => {
  // const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  //
  const [stationInput, setStationInput] = useState("");
  const [suggestionsShown, setSuggestionsShow] = useState(false);
  const [selected, setSelected] = useState<StationResult | undefined>();

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

  const suggestions = useMemo(() => {
    if (!stationInput) return [];
    return findStations(stationInput).slice(0, 10);
  }, [stationInput]);

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
          <p>Enter a station here</p>
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
          <p>OR</p>
          <p>Select on the Map</p>

          <Button label="Confirm" disabled={!selected} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default StationForm;
