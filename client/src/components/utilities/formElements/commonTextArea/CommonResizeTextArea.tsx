import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";
import CommonErrorText from "../CommonErrorText";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  control?: Control;
  parentClassName?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeHolder?: string;
  rows?: number;
  cols?: number;
  label?: string;
  name: string;
  style?:any;
  error?: FieldErrors<FieldValues> | undefined;
}

const CommonResizeTextArea: React.FC<IProps> = (props) => {
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
  console.log("error=>",error);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor="contentManagement" className="form-label m-0">
          {label}
        </label>
      )}
      <Controller
        render={({ field }) => (
          <textarea
            {...field}
            {...props}
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

export default React.memo(CommonResizeTextArea);
