import Joi from "joi";
import { emailRegex, passwordRegex } from "../../utils/constant";

const joiObject = Joi.object().options({ abortEarly: false });

export const emailValidation = joiObject.keys({
  email: Joi.string().regex(emailRegex).required().trim(),
});

const passwordValidation = joiObject.keys({
  password: Joi.string().regex(passwordRegex).required(),
});

const nameValidation = joiObject.keys({
  name: Joi.string(),
});

const phoneValidation = joiObject.keys({
  phone: Joi.string()
    .length(10)
    .pattern(/^(?!0{10})[0-9]{10}$/)
    .required(),
});

const countryValidation = joiObject.keys({
    country: Joi.string().optional(),
  });

export const signupValidationSchema = Joi.object()
  .concat(emailValidation)
  .concat(passwordValidation)
  .concat(nameValidation)
  .concat(phoneValidation)
  .concat(countryValidation);

  export const signInValidationSchema = Joi.object()
  .concat(emailValidation)
  .concat(passwordValidation)


  export const forgotPasswordValidationSchema = Joi.object()
  .concat(emailValidation)
