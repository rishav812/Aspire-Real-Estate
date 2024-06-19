import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IForgotPassword } from "../../../interfaces/commonInterface";
import { ToastContainer } from "react-toastify";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../utilities/commonTostify";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../utilities/validationSchema/userAuth";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import CommonButton from "../../utilities/formElements/commonButton";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { forgotPasswordService } from "../../../services/user";

function ForgotPassword() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    try {
      const resp = await forgotPasswordService(data);
      console.log("resp=>", resp);
      if (resp.success) {
        toastMessageSuccess(resp.message);
        reset({});
        navigate("/otp-verification", {
          state: {
            email: data.email,
            encOtp: resp.data,
          },
        });
      } else {
        toastMessageError(resp?.message);
      }
    } catch (error: any) {
      console.log("error==>", error);
      toastMessageError("something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
        <div className="fp-text">
          <h2>Forgot Password</h2>
        </div>
        <div className="form-group">
          <InputWrapper
            control={control}
            type="email"
            importantLabel={true}
            placeholder="Enter Email"
            name="email"
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.email && <p>{errors?.email?.message}</p>}
          </div>
        </div>
        <div className="info-text">
          <p>
            Enter your email address and we'll send you an OTP to reset your
            password.
          </p>
        </div>
        <div className="form-group">
          <CommonButton
            className="btn btn-primary"
            loading={loading}
            disabled={loading}
            label="Send Otp"
            type="submit"
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
