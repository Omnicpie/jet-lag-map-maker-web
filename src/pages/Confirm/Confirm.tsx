import { useEffect, useState } from "react";
import type { Tab } from "../../types/Tab";
import "./Confirm.css";
import useMediaQuery from "../../hooks/useMediaQuery/useMediaQuery";
import ResultsDesktop from "./ResultsDesktop/ResultsDesktop";
import ResultsMobile from "./ResultsMobile/ResultsMobile";
import { csvToJsonRegex } from "../../utils/parse/parse.utils";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StationResult } from "../../types/StationResult";

type ConfirmProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const Confirm = ({ setCurrentTab }: ConfirmProps) => {
  const [open, setOpen] = useState<StationResult | undefined>();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [failedLookups] = useState([
    { name: "Moston" },
    { name: "Newton-le-Willows" },
    { name: "Walsden" },
  ]);
  const [stations, setStations] = useState([
    {
      name: "Liverpool Lime Street",
      found: {
        code: "LIV",
        name: "Liverpool Lime Street",
        lat: 59.78123,
        lon: -2.775,
      },
    },
    {
      name: "Manchester Victoria",
      found: {
        code: "MCV",
        name: "Manchester Victoria",
        lat: 59.78234,
        lon: -2.73,
      },
    },
    {
      name: "Liverpool Central",
      found: {
        code: "LPC",
        name: "Liverpool Central",
        lat: 59.78126,
        lon: -2.78,
      },
    },
  ]);

  const progressPhase = () => {
    setCurrentTab("complete");
  };

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
    <div className="confirm-page">
      <div className="header">
        <div className="left-side">
          <h2>Results</h2>
          <span>
            {stations.length}/{stations.length + failedLookups.length} Stations
            encoded
          </span>
        </div>

        <button className="confirm-button" onClick={progressPhase}>
          Confirm
        </button>
      </div>
      <div className="failed-results">
        <h3>Failed Lookups</h3>
        <ul>
          {failedLookups.map((item) => (
            <li key={item.name}>
              {item.name} <button>Add</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="results">
        <h3>Stations</h3>
        {isMobile ? (
          <ResultsMobile items={stations} setOpen={setOpen} open={open} />
        ) : (
          <ResultsDesktop items={stations} setOpen={setOpen} open={open} />
        )}
      </div>
    </div>
  );
};

export default Confirm;
