import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import { ILogin } from "../../../interfaces/commonInterface";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, postLoginService } from "../../../services/user";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { signInAction } from "../../../state_management/actions/AuthActions";
import { userSignInSchema } from "../../utilities/validationSchema/userAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import React from "react";
import CommonButton from "../../utilities/formElements/commonButton";
import { toastMessageError, toastMessageSuccess } from "../../utilities/commonTostify";

const LoginModel = () => {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(userSignInSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    setButtonDisabled1(true);
    try {
      const res = await postLoginService(data);
      console.log("res=>", res);
      const newRes = res.data;
      if (res.status) {
        localStorage.setItem("login", newRes.token);
        const { user_id, image, name, email, phone } = newRes;
        dispatch(signInAction({ user_id, image, name, email, phone }));
        toastMessageSuccess(res.message);
        navigate("/user-dashboard");
      } else {
        toastMessageError(res.message);
      }
    } catch (error: any) {
      toastMessageError("something went wrong");
    }
    setLoading(false);
    setButtonDisabled1(false);
  };

  const handleGoogleLogin = async (response: any) => {
    setButtonDisabled1(true);
    try {
      const resp = await googleLogin({ googleCredential: response.credential });
      if (resp.status) {
        localStorage.setItem("login", resp.data.token);
        // localStorage.setItem("social_login", true);
        const { user_id, image, name, email, phone } = resp.data;
        dispatch(signInAction({ user_id, image, name, email, phone }));
        toastMessageSuccess(resp.message);
        navigate("/user-dashboard");
      }
    } catch (err) {
      toastMessageError("something went wrong");
    }
    setButtonDisabled1(true);
  };

  // const handleFacebookLogin = ({ name, email }: any) => {
  //   console.log("name==>", name, " email==>", email);
  // };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
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
              {errors && errors?.email && (
                <p>{errors?.email?.message}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <InputWrapper
              control={control}
              type="password"
              placeholder="Enter Password"
              importantLabel={true}
              name="password"
              className="form-control beautiful-input"
            />
            <div className="message error">
              {errors && errors?.password && (
                <p>{errors?.password?.message}</p>
              )}
            </div>
          </div>
          <CommonButton
            className="btn btn-primary"
            loading={loading}
            disabled={loading}
            label="Sign In"
            type="submit"
          />
          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="or-separator">
            <span>or</span>
          </div>
          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Google login failed")}
              containerProps={{ className: "social-btn" }}
            />
            {/* <FacebookLogin
              appId="1134717074478971"
              autoLoad={false}
              callback={handleFacebookLogin}
              fields="name,email"
            /> */}
          </div>
          <div className="sign-up-link">
            <span>Don’t have an account?</span>
            <Link to="/sign-up">Sign Up Now</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginModel;