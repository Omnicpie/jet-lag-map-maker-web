import Dropdown from "../../../components/Dropdown/Dropdown";
import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";
import { humanize } from "../../../utils/text/text.utils";
import "./Area.css";

type AreaProps = {
  name: string;
  value?: string;
  setValue: (v: string) => void;
  visible?: boolean;
  setVisible: (v: boolean) => void;
};

const options = [
  { label: "Custom", value: "custom" },
  { label: "Countries", value: "country" },
  { label: "Counties", value: "county" },
  { label: "Boroughs", value: "borough" },
  { label: "Postcodes", value: "postcode" },
  { label: "Wards", value: "ward" },
];

const Area = ({ name, value, setValue, visible, setVisible }: AreaProps) => {
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
    </div>
  );
};

export default Area;
