import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import CommonButton from "../../utilities/formElements/commonButton";
import "./ResetPassword.css";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { resetPasswordSchema } from "../../utilities/validationSchema/userAuth";
import { resetPasswordService } from "../../../services/user";
import { toastMessageError, toastMessageSuccess } from "../../utilities/commonTostify";

function ResetPassword() {
    const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { email } = location?.state || {};
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: {
    new_password: string;
    confirm_new_password: string;
  }) => {
    setLoading(true);
    setButtonDisabled1(true);
    const reqData = { ...data, email };
    const response = await resetPasswordService(reqData);
    if(response.success){
        reset({});
        toastMessageSuccess(response?.message);
    }else{
        toastMessageError(response?.message);
    }
    setLoading(false);
    setButtonDisabled1(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <form onSubmit={handleSubmit((data) => onSubmit(data as any))}>
          {/* <div className="lock-icon">
            <img src="/path/to/lock-icon.png" alt="Lock Icon" />
          </div> */}
          <h3>Reset Password</h3>
          <br />
          <div className="form-group">
            <InputWrapper
              placeholder="New Password"
              control={control}
              name="new_password"
              type="password"
              align="right"
              className="form-control beautiful-input"
            />
            <div className="error-message">
              {errors?.new_password && <p>{errors?.new_password.message}</p>}
            </div>
          </div>
          <div className="form-group">
            <InputWrapper
              placeholder="Confirm New Password"
              control={control}
              name="confirm_new_password"
              type="password"
              className="form-control beautiful-input"
            />
            <div className="error-message">
              {errors?.confirm_new_password && (
                <p>{errors?.confirm_new_password.message}</p>
              )}
            </div>
          </div>
          <CommonButton
            label="Reset Password"
            className="primary-btn rounded-md w-100"
            type="submit"
            disabled={isButtonDisabled1}
            loading={loading}      
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
