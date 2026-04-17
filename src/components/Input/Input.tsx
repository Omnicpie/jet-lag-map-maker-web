import type { ChangeEventHandler } from "react";
import "./Input.css";

type InputProps = {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  className?: string;
  value: string;
};

const Input = ({
  placeholder,
  onChange,
  className = "",
  value,
}: InputProps) => {
  return (
    <input
      onChange={onChange}
      className={`input ${className}`}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
