import React, { FC, InputHTMLAttributes } from "react";
import CommonInputBox from "./commonInputBox";
import { Control, FieldValues } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  align?: string;
  type:
    | "email"
    | "hidden"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "file"
    | "url"
    | "checkbox";
  control: Control | any;
  value?: string;
  placeholder?: string;
  importantLabel?:boolean;
  className: string;
  onClick?: any;
  onChange?: any;
  checked?: any;
}

const InputWrapper: FC<Props> = ({
  label,
  name,
  type,
  placeholder,
  importantLabel,
  className,
  ...props
}) => {
  return (
    <div>
      <CommonInputBox
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        {...(label? { label } : {})}
        {...(importantLabel ? { importantLabel } : {})}
        {...props}     
      />
    </div>
  );
};

export default InputWrapper;
