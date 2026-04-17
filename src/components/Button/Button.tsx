import type { MouseEventHandler } from "react";
import "./Button.css";

type ButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({ label, onClick, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {label}
    </button>
  );
};

export default Button;
