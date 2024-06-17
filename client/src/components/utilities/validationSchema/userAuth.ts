import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  emailRegex,
  mobileNumberRegex,
  passwordRegex,
} from "../../../constants/auth";

export const userSignInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email address"),
  password: yup
    .string()
    .required("password is required")
    .matches(passwordRegex, "Invalid password")
    .min(8)
    .max(32),
});

export const resetPasswordSchema= yup.object().shape({
  new_password: yup
    .string()
    .required("new password is required")
    .matches(passwordRegex, "Invalid password")
    .min(8)
    .max(32),
  confirm_new_password: yup
    .string()
    .required("confirm password is required")
    .matches(passwordRegex, "Invalid password")
    .min(8)
    .max(32),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email address"),
});

export const userSignupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^((?!\s\s).)*$/, "Name cannot contain multiple spaces")
    .matches(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or symbols"),

  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email address"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(mobileNumberRegex, "Phone number must contain integer only")
    .matches(/^(?!0{10})[0-9]{10}$/, "Please check phone number length"),

  password: yup
    .string()
    .required("password is required")
    .matches(passwordRegex, "Invalid password")
    .min(8)
    .max(32),

  country: yup.string().required("country is required"),
});
