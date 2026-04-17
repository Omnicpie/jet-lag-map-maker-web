import type { ChangeEventHandler } from "react";
import "./Input.css";

type InputProps = {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  className?: string;
  value: string;
  label?: string;
  wrapped?: boolean;
  disabled?: boolean;
};

const Input = ({
  placeholder,
  onChange,
  className = "",
  value,
  label,
  wrapped = false,
  disabled = false,
}: InputProps) => {
  if (wrapped) {
    return (
      <div className="input-wrapper">
        {label ? <label htmlFor={label}> {label}</label> : null}
        <input
          onChange={onChange}
          className={`input ${className}`}
          value={value}
          placeholder={placeholder}
          id={label}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <>
      {label ? <label htmlFor={label}> {label}</label> : null}
      <input
        onChange={onChange}
        className={`input ${className}`}
        value={value}
        placeholder={placeholder}
        id={label}
      />
    </>
  );
};

export default Input;
