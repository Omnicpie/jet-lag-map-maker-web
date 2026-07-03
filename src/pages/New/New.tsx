import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import type { Tab } from "../../types/Tab";
import "./New.css";
import useSettings from "../../hooks/useSettings/useSettings";
import useResults from "../../hooks/useResults/useResults";

type NewProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<Tab>>;
  setRoverLink: React.Dispatch<React.SetStateAction<string>>;
};

const New = ({ setCurrentTab, setRoverLink }: NewProps) => {
  const [value, setValue] = useState("");
  const { gamesize, units, lookupTool } = useSettings();
  const { setFailedStations, setCalculatedStations } = useResults();

  const progressPhase = () => {
    setRoverLink(value);
    setCurrentTab("generating");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setValue(e.target.value);
  };

  const displaySize = useMemo(() => {
    if (gamesize === "l") return "Large";
    if (gamesize === "sm") return "Small/Medium";
    if (gamesize === "custom") return "Custom";
    return "";
  }, [gamesize]);

  useEffect(() => {
    setCalculatedStations([]);
    setFailedStations([]);
  }, []);

  return (
    <div className="new-page">
      <div className="logo">
        <h3>Jet Lag: The Game Hide &amp; Seek</h3>
        <h1>Map Maker</h1>
      </div>
      <div className="infobox">
        <span>
          <b>{displaySize}</b> sized <b>{units}</b> game
        </span>
        <span>
          Using <b>{lookupTool}</b> for lookup
        </span>
      </div>
      <Input
        placeholder="Enter RailRover Link"
        value={value}
        onChange={handleInputChange}
      />
      <Button label="Generate" onClick={progressPhase} disabled={!value} />
    </div>
  );
};

export default New;
