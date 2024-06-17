import bcrypt from "bcrypt";
import User from "./model/user";
import { IPostSignup, IPostLogin } from "./interface";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { createToken, sendOtpEmail } from "../../utils/helper";
const stripe = require("stripe")(
  "sk_test_51MBWXdSA4Sjfy5zC6wI3R8hpK3MhoCF9gvve8ggOhMjica8sywiZETJINKCUybtYQxs43DEqA4eYJYQKQLmWRDAg00pHzDJCz9"
);
import CryptoJS, { enc } from "crypto-js";

require("dotenv").config();

export class AuthServices {
  static postSignup = async (body: IPostSignup) => {
    const { name, email, phone, password, country } = body;
    const user = await User.findOne({ email: email });
    if (user) {
      return {
        code: 409,
        status: "failed",
        message: "Email already exists",
      };
    } else {
      if (!name || !email || !phone || !password || !country) {
        return {
          code: 400,
          status: "failed",
          message: "All fields are required",
        };
      } else {
        try {
          // const customer = await stripe.customers.create({
          //   email: email,
          //   name: name,
          // });
          // console.log("customer====>>>", customer);
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          const document = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashPassword,
            country: country,
            is_active: 1,
            is_verified: 1,
            created_ts: new Date().getTime(),
            updated_ts: new Date().getTime(),
            // stripeCustomerId: customer.id,
          });

          await document.save();
          return {
            code: 200,
            status: "success",
            message: "User registered successfully",
          };
        } catch (error) {
          return {
            code: 400,
            status: "failed",
            message: "unable to register",
          };
        }
      }
    }
  };

  static postLogin = async (body: IPostLogin) => {
    try {
      const { email, password } = body;
      if (email && password) {
        const user = await User.findOne({ email: email });
        // const id = user?._id.toString();

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return {
              success: false,
              message: "Credential Error",
            };
          } else if (!user.is_active) {
            return {
              success: false,
              message: "Inactive User",
            };
          }

          const { _id, email, isAdmin } = user;
          const jwtToken = await createToken({
            _id,
            isAdmin,
            email,
          });

          return {
            data: {
              user_id: _id,
              image: user.image,
              name: user.name,
              email: user.email,
              phone: user.phone,
              isAdmin: user.isAdmin,
              token: jwtToken,
            },
            status: "success",
            message: "User Login Success",
          };
        } else {
          return {
            status: "failed",
            message: "Email or Password is not valid",
          };
        }
      }
      // } else if (email === admin.email && password === admin.password) {
      //   const payload = { email: admin.email };

      //   const token = jwt.sign(
      //     payload,
      //     process.env.JWT_SECRET_KEY as string,
      //     { expiresIn: "5d" }
      //   );

      //   return {
      //     code: 200,
      //     status: "success",
      //     message: "Admin Login Success",
      //     data: { ...admin, token },
      //   };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  };

  static postGoogleLogin = async (data: { googleCredential: string }) => {
    try {
      if (data.googleCredential) {
        const decodeData: any = jwt.decode(data.googleCredential);
        console.log("decodeData", decodeData);
        const email = decodeData?.email;
        const UserExist = await User.findOne({ email: email });
        console.log("userExist===>", !UserExist);

        if (!UserExist) {
          const user = new User({
            name: decodeData.name,
            email: email,
            phone: decodeData.phone,
            country: decodeData.country,
            is_active: 1,
            is_verified: decodeData.email_verified ? 1 : -1,
            created_ts: new Date().getTime(),
            updated_ts: new Date().getTime(),
          });
          const user_details = await user.save();
          console.log("user_details", user_details);
        } else {
          const { _id, email, isAdmin } = UserExist;
          const jwtToken = await createToken({
            _id,
            isAdmin,
            email,
          });
          return {
            data: {
              user_id: _id,
              image: UserExist.image,
              name: UserExist.name,
              email: UserExist.email,
              phone: UserExist.phone,
              isAdmin: UserExist.isAdmin,
              token: jwtToken,
            },
            status: "success",
            message: "User Login Success",
          };
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  };

  static forgotPasswordService = async (data: { email: string }) => {
    try {
      const { email } = data;
      const query = { email: email.toLowerCase() };
      const userExist: any = await User.findOne(query);
      if (userExist) {
        const otp = await sendOtpEmail(
          email as string,
          "forgot-password",
          userExist.name
        );
        console.log("otp", otp);
        const encryptedOtp = enc.Base64.stringify(
          CryptoJS.HmacSHA256(otp.toString(), process.env.crypto_key as string)
        );
        console.log("encryptedOtp", encryptedOtp);
        return {
          success: true,
          message: "An otp has been sent on your email.",
          data: encryptedOtp,
        };
      } else {
        return {
          status: "failed",
          message: "User is not registered",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  };

  static otpVerificationService = async (data: {
    encOtp: string;
    newOtp: string;
  }) => {
    const { encOtp, newOtp } = data;
    const newOtpEncryption = enc.Base64.stringify(
      CryptoJS.HmacSHA256(newOtp.toString(), process.env.crypto_key as string)
    );
    if (encOtp === newOtpEncryption) {
      return {
        success: true,
        message: "Otp verified successfully",
      };
    } else {
      return {
        success: false,
        message: "Otp does not match",
      };
    }
  };

  static resetPasswordService = async (data: {
    new_password: string;
    confirm_new_password: string;
    email: string;
  }) => {
    let { email, new_password, confirm_new_password } = data;
    try {
      if (new_password !== confirm_new_password) {
        return {
          success: false,
          message: "Password does not match.",
        };
      }
      const encPassword = await bcrypt.hash(new_password, 8);
      const result = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: encPassword } }
      );
      // console.log("result",result); 
      return{
        success:true,
        message:"Password updated successfully"
      }
    } catch (error: any) {
      console.log("error=>", error);
      return {
        success: false,
        message: "something went wrong",
      };
    }
  };
}
