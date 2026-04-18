import type { MouseEventHandler } from "react";
import "./Button.css";

type ButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  label,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
