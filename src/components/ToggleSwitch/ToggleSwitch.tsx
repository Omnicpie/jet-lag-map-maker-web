import type { InputHTMLAttributes } from "react";
import "./ToggleSwitch.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  handleChange: (v: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ checked = false, handleChange, ...kwargs }: Props) => (
  <label
    className={`toggle-switch-container${kwargs.disabled ? " disabled" : ""}`}
    onClick={() => handleChange(!checked)}
  >
    <input
      className="toggle-switch-checkbox"
      type="checkbox"
      onChange={() => handleChange(!checked)}
      {...kwargs}
    />
    <label className={`toggle-switch-label${checked ? " checked" : ""}`}>
      <span
        className={`toggle-switch-background${checked ? " checked" : ""}`}
        data-yes={"ON"}
        data-no={"OFF"}
        tabIndex={-1}
      />
      <span
        className={`toggle-switch-dot${checked ? " checked" : ""}`}
        tabIndex={-1}
      />
    </label>
  </label>
);

export default ToggleSwitch;
