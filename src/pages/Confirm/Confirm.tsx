import { useState } from "react";
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

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const [open, setOpen] = useState<StationResult | undefined>();
  const [form, setForm] = useState<string | undefined>();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { failedStations, calculatedStations } = useResults();

  const progressPhase = () => {
    setCurrentTab("complete");
  };

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
                onClick={() => setForm(item)}
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
            open={open}
          />
        ) : (
          <ResultsDesktop
            items={calculatedStations}
            setOpen={setOpen}
            open={open}
          />
        )}
      </div>
      {form
        ? createPortal(
            <StationForm stationName={form} setOpen={setForm} />,
            //@ts-expect-error portal root could in theory be null, but never will be
            document.getElementById("portal-root"),
          )
        : null}
    </div>
  );
};

export default Confirm;
