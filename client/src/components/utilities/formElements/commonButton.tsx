import React from "react";
import { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string | ReactNode;
  iconSrc?: string;
  loading?: boolean;
  style?: CSSProperties;
}

const CommonButton: FC<Props> = ({
  className,
  label,
  iconSrc,
  disabled,
  loading,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`btnC ${className}`}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      {props.children}
      {label}
      {iconSrc ? <img src={iconSrc} alt="icon" className="icon-btn" /> : null}
      {loading ? <div className="spinner-border"></div> : null}
    </button>
  );
};

export default CommonButton;
