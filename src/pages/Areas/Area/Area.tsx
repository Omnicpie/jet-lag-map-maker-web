import { useMemo } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Input from "../../../components/Input/Input";
import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";
import { humanize } from "../../../utils/text/text.utils";
import "./Area.css";
import { isObject } from "@turf/helpers";

type AreaProps = {
  name: string;
  value?: string;
  setValue: (v: string) => void;
  visible?: boolean;
  setVisible: (v: boolean) => void;
  isDrawing?: boolean;
  setDrawing: () => void;
  data?: unknown;
};

const options = [
  { label: "Custom", value: "custom" },
  { label: "Countries", value: "country" },
  { label: "Counties", value: "county" },
  { label: "Boroughs", value: "borough" },
  { label: "Postcodes", value: "postcode" },
  { label: "Wards", value: "ward" },
];

const Area = ({
  name,
  value,
  setValue,
  visible,
  setVisible,
  isDrawing,
  setDrawing,
  data,
}: AreaProps) => {
  const features = useMemo(() => {
    if (!data || !isObject(data)) return 0;

    return Object.keys(data).length;
  }, [data]);

  return (
    <div className="area">
      <div className="top">
        <h2>{humanize(name)}</h2>
      </div>
      <div className="bottom">
        <Dropdown
          label="Datasource"
          inputId={name}
          value={value}
          options={options}
          onChange={(e) => setValue(e.value)}
          getDispayValue={humanize}
        />
        <div className="toggle-container">
          <p>Show on map</p>
          <ToggleSwitch checked={visible} handleChange={setVisible} />
        </div>
      </div>
      {value === "custom" ? (
        <div className="bottom">
          <Input
            value={`${features} Feature${features === 1 ? "" : "s"}`}
            label="Data"
            disabled
            wrapped
            onChange={() => {}}
          />
          <div className="toggle-container">
            <p>Draw</p>
            <ToggleSwitch checked={isDrawing} handleChange={setDrawing} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Area;
