import Dropdown from "../../../components/Dropdown/Dropdown";
import { humanize } from "../../../utils/text/text.utils";

type AreaProps = {
  name: string;
  value?: string;
  setValue: (v: unknown) => void;
};

const options = [
  { label: "Custom", value: "custom" },
  { label: "Countries", value: "country" },
  { label: "Counties", value: "county" },
  { label: "Boroughs", value: "borough" },
  { label: "Postcodes", value: "postcode" },
  { label: "Wards", value: "ward" },
];

const Area = ({ name, value, setValue }: AreaProps) => {
  return (
    <div className="Area">
      <div>
        <p>{humanize(name)}</p>
        <Dropdown
          inputId={name}
          value={value}
          options={options}
          onChange={(e) => setValue(e.value)}
          getDispayValue={humanize}
        ></Dropdown>
      </div>
      <div></div>
    </div>
  );
};

export default Area;
