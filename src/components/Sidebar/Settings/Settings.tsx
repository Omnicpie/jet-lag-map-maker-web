import Input from "../../Input/Input";
import "./Settings.css";
import useSettings from "../../../hooks/useSettings/useSettings";
import { getDistanceUnit, getZoneSize } from "../../../utils/units/units.utils";
import Dropdown from "../../Dropdown/Dropdown";

const Settings = () => {
  const { gamesize, setField, units, lookupTool, apiKey, customRadius } =
    useSettings();
  const distanceUnit = getDistanceUnit(units);
  return (
    <div className="settings">
      <h2>Settings</h2>
      <Dropdown
        inputId="units"
        label="Units"
        onChange={(v) => setField("units", v.value)}
        value={units}
        getDispayValue={(v) =>
          v ? `${v[0]?.toUpperCase?.()}${v.slice(1)}` : ""
        }
        options={[
          { label: "Metric", value: "metric" },
          { label: "Imperial", value: "imperial" },
        ]}
      />
      <Dropdown
        inputId="gamesize"
        label="Game Size"
        onChange={(v) => setField("gamesize", v.value)}
        value={gamesize}
        getDispayValue={(v) =>
          ({ l: "Large", sm: "Small/Medium", custom: "Custom" })[v] || ""
        }
        options={[
          { label: "Large", value: "l" },
          { label: "Small/Medium", value: "sm" },
          { label: "Custom", value: "custom" },
        ]}
      />

      <Input
        label={`Zone Size (${distanceUnit})`}
        onChange={() => {}}
        value={String(getZoneSize(gamesize, units, customRadius))}
        disabled={gamesize !== "custom"}
        wrapped
      />
      <Dropdown
        inputId="lookupTool"
        label="Lookup Tool"
        onChange={(v) => setField("lookupTool", v.value)}
        value={lookupTool}
        getDispayValue={(v) =>
          ({ npm: "NPM Package", google: "Google", neo: "Neometer" })[v] || ""
        }
        options={[
          { label: "NPM Package", value: "npm" },
          { label: "Google", value: "google" },
          { label: "Neometer", value: "neo" },
        ]}
      />
      {lookupTool === "google" ? (
        <Input
          onChange={(e) => setField("apiKey", e.target.value)}
          value={apiKey || ""}
          wrapped
          placeholder="Google Api Key"
        />
      ) : null}
    </div>
  );
};

export default Settings;
