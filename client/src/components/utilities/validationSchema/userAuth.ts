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

export const resetPasswordSchema = yup.object().shape({
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

export const listingValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^((?!\s\s).)*$/, "Name cannot contain multiple spaces")
    .matches(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or symbols"),

  description: yup
    .string()
    .required("Desciption is required")
    .min(10, "Description must be at least 10 characters"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),

  property_type: yup
    .array()
    .min(1, "Select at least one property type")
    .required("Property type is required"),

  property_status: yup.array().required("Property status is required"),

  beds: yup
    .number()
    .typeError("Beds must be a number")
    .required("Beds are required")
    .positive("Beds must be a positive number"),

  baths: yup
    .number()
    .typeError("Baths must be a number")
    .required("Baths are required")
    .positive("Baths must be a positive number"),

  regular_price: yup
    .number()
    .typeError("Regular price must be a number")
    .required("Regular price is required")
    .positive("Regular price must be a positive number"),

  discounted_price: yup
    .number()
    .typeError("Discounted price must be a number")
    .required("Discounted price is required")
    .positive("Discounted price must be a positive number")
    .lessThan(
      yup.ref("regular_price"),
      "Discounted price must be less than Regular price"
    ),

  image: yup
    .array()
    .required("Please select at least one image")
    .test("fileType", "Only PNG and JPEG files are allowed", (files) => {
      if (!files) return false;
      for (let i = 0; i < files.length; i++) {
        const fileType = files[i].type;
        if (fileType !== "image/png" && fileType !== "image/jpeg") {
          return false;
        }
      }
      return true;
    })
    .test("fileSize", "File size is too large", (files) => {
      if (!files) return false;
      for (let i = 0; i < files.length; i++) {
        const fileSize = files[i].size;
        if (fileSize > 1024 * 1024 * 5) {
          // 5 MB limit
          return false;
        }
      }
      return true;
    }),
});
