import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react18-input-otp";
import "./OtpVerification.css";
import CommonButton from "../../utilities/formElements/commonButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../../utilities/commonTostify";
import { OtpVerificationService } from "../../../services/user";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, encOtp } = location?.state || {};
  const [otpstate, setOtpState] = useState("");
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (enteredOtp: React.SetStateAction<string>) => {
    setOtpState(enteredOtp);
  };

  const submitOtpVerification = async () => {
    setLoading(true);
    setButtonDisabled1(true);
    if (otpstate.length < 5) {
      toastMessageError("please_enter_the_otp");
      return;
    }
    const data = {
      encOtp: encOtp,
      newOtp: otpstate,
    };
    const response = await OtpVerificationService(data);
    console.log("response", response);
    if (response.success) {
      toastMessageSuccess(response?.message);
      navigate("/reset-password", {
        state: {
          email: email,
        },
      });
    } else {
      toastMessageError(response?.message);
    }
    setLoading(false);
    setButtonDisabled1(false);
  };

  return (
    <div className="verify-container">
      <div className="form-block">
        <h3 className="form-title">Please Verify Account</h3>
        <p className="form-subtitle">
          Enter the six digit code we sent to your email address to verify your
          account:
        </p>
        <div className="form-group">
          <OtpInput
            value={otpstate}
            onChange={handleChange}
            numInputs={5}
            isInputNum
            inputStyle="otp-input"
            containerStyle="otp-container"
          />
        </div>
        <div className="form-actions">
          <CommonButton
            className="verify-button"
            onClick={submitOtpVerification}
            disabled={isButtonDisabled1}
            loading={loading}
            label="Verify & Continue"
          />
          <CommonButton
            className="cancel-button"
            label="Cancel"
            onClick={() => console.log("Cancel")}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OtpVerification;
