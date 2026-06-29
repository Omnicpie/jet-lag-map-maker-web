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

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const [open, setOpen] = useState<StationResult | undefined>();
  const [form, setForm] = useState<
    { stationName: string; current?: StationResult } | undefined
  >();
  const isMobile = useMediaQuery("(max-width: 1024px)");
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

        <Button
          onClick={progressPhase}
          label="Confirm"
          className="confirm-button"
        />
      </div>
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
