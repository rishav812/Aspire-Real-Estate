import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICountry, ISignup } from "../../interfaces/commonInterface";
import InputWrapper from "../utilities/formElements/InputWrapper";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCountries, postSignupService } from "../../services/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignupValidationSchema } from "../utilities/validationSchema/userAuth";
import React from "react";
import CommonSelect from "../utilities/formElements/CommonSelect";
import CommonButton from "../utilities/formElements/commonButton";
import { toastMessageError, toastMessageSuccess } from "../utilities/commonTostify";

const SignupModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<ICountry[]>([]);
  // const [url, setUrl] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userSignupValidationSchema),
  });

  const navigate = useNavigate();

  const getAllCountries = async () => {
    const resp = await getCountries();
    setCountries(resp?.data);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  // const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target && (e.target.files as FileList);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = function () {
  //     const result = reader.result;

  //     if (result && typeof result === "string") {
  //       setProductData({ ...productData, image: result });
  //       setUrl(result);
  //     }
  //     reader.onerror = function (error) {
  //       console.log("Error: ", error);
  //     };
  //   };
  // };

  const onSubmit = async (data: ISignup) => {
    try {
      setLoading(true);
      const res = await postSignupService(data);
      if (res.status == "success") {
        toastMessageSuccess(res.message);
        navigate("/login");
      } else {
        toastMessageError(res.message);
      }
    } catch (error) {
      toastMessageError("something went wrong");
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data as ISignup))}
        className="col-md-4 offset-md-4 mt-5"
      >
        <div className="ant-row">
          {/* <div className="ant-col1"></div> */}
          <div className="ant-col2">
            <h2 className="text-center">Sign Up</h2>
            <br />
            <div>
              <InputWrapper
                label="Name"
                type="text"
                importantLabel={true}
                align="right"
                control={control}
                name="name"
                className="form-group"
              />
              {errors && errors?.name && (
                <p className="text text-danger">
                  <>{errors?.name?.message}</>
                </p>
              )}

              <InputWrapper
                label="Email"
                type="email"
                importantLabel={true}
                align="right"
                control={control}
                name="email"
                className="form-group"
              />
              {errors && errors?.email && (
                <p className="text text-danger">
                  <>{errors?.email?.message}</>
                </p>
              )}

              <InputWrapper
                label="Password"
                type="password"
                importantLabel={true}
                align="right"
                control={control}
                name="password"
                className="form-group"
              />
              {errors && errors?.password && (
                <p className="text text-danger">
                  <>{errors?.password?.message}</>
                </p>
              )}
              <InputWrapper
                label="Phone"
                type="number"
                importantLabel={true}
                align="right"
                control={control}
                name="phone"
                className="form-group"
              />
              {errors && errors?.phone && (
                <p className="text text-danger">
                  <>{errors?.phone?.message}</>
                </p>
              )}
              <CommonSelect
                className="form-group"
                label="Select Country"
                name="country"
                control={control}
                firstOption="Select"
                option={countries}
              />
              {errors && errors?.country && (
                <p className="text text-danger">
                  <>{errors?.country?.message}</>
                </p>
              )}

              <CommonButton
                className="submit-btn btnC-primary btnC-lg hover-btnC btnC-radius-sm me-3"
                loading={loading}
                disabled={loading}
                label="Sign Up"
                type="submit"
              />
            </div>
          </div>
        </div>
        <br />
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupModal;
