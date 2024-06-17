import React, { SelectHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  Control,
  Controller,
  FieldError,
} from "react-hook-form";
// import { useTranslation } from "react-i18next";

interface IOptions {
  id?: string | number;
  label?: string | number;
  value?: string | number;
}

interface Iprops
  extends Omit<
    SelectHTMLAttributes<HTMLInputElement>,
    "onChange" | "defaultValue"
  > {
  option: IOptions[];
  errors?: FieldError | FieldErrors<FieldValues>;
  name: string;
  className: string;
  firstOption?: string;
  secondOption?: string;
  defaultValue?:
    | {
        name: string;
        id: string;
      }
    | string
    | number;
  control?: Control;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  onchange?: () => void;
  required?: boolean;
  onChange?: (optionId: any) => void;
}

const CommonSelect: React.FC<Iprops> = (props) => {
  const {
    option,
    className = "",
    name,
    defaultValue,
    control,
    disabled,
    label,
    required,
    firstOption,
    secondOption,
    onChange,
    onchange,
  } = props;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="font14">
          {label}
          {required ? <sup className="colorRed">*</sup> : null}
        </label>
      )}

      <Controller
        render={({ field }) => (
          <select
            {...field}
            className={className}
            disabled={disabled ? disabled : false}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              field.onChange(e);
              if (onChange) {
                return onChange(e);
              }
              console.log("onchange",onchange)
              onchange && onchange();
            }}
          >
            <option selected disabled={firstOption ? true : false} value="">
              {firstOption && firstOption}
            </option>
            {secondOption && (
              <option value="">
                {secondOption && secondOption }
              </option>
            )}
            {option?.map((item, index: number) => (
              <option key={`${index}+${item.label}`} value={item.value}>
                {item?.label ?? item?.value}
              </option>
            ))}
          </select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue as string}
      />
    </div>
  );
};

export default CommonSelect;
