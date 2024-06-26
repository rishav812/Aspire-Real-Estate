import React from "react";
import Select, { Props as SelectProps } from "react-select";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

import CommonErrorText from "../CommonErrorText";

interface IMultiSelect {
  label: string;
  value: string;
}

interface IProps extends Omit<SelectProps, "noOptionsMessage"> {
  control: Control;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  isClearable?: boolean;
  label?: string;
  name: string;
  isMulti?:boolean,
  required?: boolean;
  options: IMultiSelect[];
  onChange?: (value: any) => void;
  onchange?: () => void;
  // onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick?:any
  value?: unknown;
  getValue?: (arg: string) => void;
  className?: string;
  noOptionsMessage?: string;
}

const CommonMultiSelect: React.FC<IProps> = ({
  control,
  disabled,
  errors,
  isClearable = true,
  label,
  name,
  isMulti,
  noOptionsMessage,
  required,
  onchange,
  onClick,
  getValue,
  value = [],
  ...props
}) => {
  return (
    <div className="form-group" onClick={onClick}>
      {label && (
        <label htmlFor={`${label}_${name}`}>
          {label} {required ? <sup className="colorRed">*</sup> : null}
        </label>
      )}
      <Controller
        render={({ field }) => (
          <Select
            onChange={(e) => {
              field.onChange(e);
              onchange && onchange();
              // console.log("getValue && getValue(e.value);",getValue && getValue(e.value))
              getValue && getValue(e.value);
            }}
            onBlur={field.onBlur}
            value={field.value}
            name={name}
            isMulti={isMulti}
            isDisabled={disabled}
            id={`${label}_${name}`}
            noOptionsMessage={() => noOptionsMessage}
            isClearable={isClearable}
            placeholder="Select"
            {...props}
          />
        )}
        name={name}
        control={control}
        defaultValue={value}
      />

      {/* Common Error message component  */}
      <CommonErrorText errors={errors} />
    </div>
  );
};

export default CommonMultiSelect;
