import React, { ChangeEvent, InputHTMLAttributes } from "react";
import "./commonInputBox.css";
import {
  Controller,
  Control,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control;
  type: string;
  importantLabel?: boolean;
  placeholder?: string;
  className: string;
  name: string;
  fieldType?: string;
  value?: string;
  label?: string;
  onChange?: (event: InputHTMLAttributes<HTMLInputElement>) => void;
  error?: FieldError | FieldErrors<FieldValues>;
}

const CommonInputBox: React.FC<IProps> = (props) => {
  const {
    type,
    importantLabel,
    className,
    placeholder,
    name,
    control,
    disabled=false,
    value,
    label,
    onChange,
  } = props;

  return (
    <div className="right-icon-input">
      {label && (
        <label className="input-label">
          {label}
          {importantLabel ? <sup>*</sup> : null}
        </label>
      )}
      <Controller
        render={({ field }) => (
          <input
            {...field}
            type={type}
            className={className}
            value={field.value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(
              e: ChangeEvent<HTMLInputElement> | CustomEvent<HTMLInputElement>
            ) => {
              field.onChange(e);
              if (onChange) {
                onChange(e as CustomEvent<HTMLInputElement>);
              }
            }}
          />
        )}
        defaultValue={value || ""}
        name={name}
        control={control}
      />
    </div>
  );
};

export default CommonInputBox;
