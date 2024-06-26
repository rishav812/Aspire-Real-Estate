import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";
import CommonErrorText from "../CommonErrorText";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  control?: Control;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeHolder?: string;
  rows?: number;
  cols?: number;
  label?: string;
  name: string;
  error?: FieldErrors<FieldValues> | undefined;
}

const CommonTextArea: React.FC<IProps> = (props) => {
  const {
    className,
    placeHolder,
    name,
    control,
    error,
    value,
    disabled = false,
    readOnly = false,
    rows = 4,
    cols,
    label,
    onChange,
  } = props;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor="contentManagement" className="form-label">
          {label}
        </label>
      )}
      <Controller
        render={({ field }) => (
          <textarea
            {...field}
            className={`${className}`}
            placeholder={placeHolder}
            rows={rows}
            cols={cols}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
          />
        )}
        defaultValue={value}
        name={name}
        control={control}
      />

      <CommonErrorText errors={error} />
    </div>
  );
};

export default React.memo(CommonTextArea);
