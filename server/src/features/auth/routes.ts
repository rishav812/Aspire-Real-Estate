import express from "express";
import { SignupApi, LoginApi, GoogleLoginApi, forgotPasswordApi, otpVerificationApi, ResetPasswordApi} from "./controller";
import { schemaValidation } from "../../middleware/validateSchema";
import { forgotPasswordValidationSchema, signInValidationSchema, signupValidationSchema } from "./validations";

const auth = express.Router();

auth.post("/google-login",GoogleLoginApi);
auth.post("/signup",schemaValidation(signupValidationSchema),SignupApi); 
auth.post("/login",schemaValidation(signInValidationSchema),LoginApi);                                     
auth.post("/forgot-password",schemaValidation(forgotPasswordValidationSchema),forgotPasswordApi);
auth.post("/otp-verification",otpVerificationApi);
auth.post("/reset-password",ResetPasswordApi);

export default auth;
