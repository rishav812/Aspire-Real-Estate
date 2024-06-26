import React from "react";
import { FC } from "react";

import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
  className?: string;
  errors?: FieldErrors<FieldValues>;
};

const CommonErrorText: FC<Props> = ({ className, errors }) =>
  errors && errors.message ? (
    <div className={`error ${className ?? ""}`}>
      <>
        <span>
          <i className="fa fa-exclamation-circle" aria-hidden="true" />
        </span>
        {errors && errors?.message ? (
          <p className="alert-msg error">
            {errors?.message as unknown as string}
          </p>
        ) : null}
      </>
    </div>
  ) : null;

export default CommonErrorText;
