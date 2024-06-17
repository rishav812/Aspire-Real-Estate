import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
require("dotenv").config();

//  export const stripeObject = async () => {
//     const keys = (await getSecretKeys()) as ISecretKeys;
//     if (keys) {
//       const stripe = new Stripe(keys?.stripeKey, {
//         apiVersion: null,
//         maxNetworkRetries: 0,
//         httpAgent: null,
//         timeout: 8000,
//         host: "api.stripe.com",
//         port: 443,
//         telemetry: true,
//       });

//       return stripe;
//     }
//   };

export const createToken = async (user: any): Promise<string> => {
  const expiresIn = 60 * 60 * 24 * 7;
  return jwt.sign({ ...user }, process.env.JWT_SECRET_KEY as string, {
    expiresIn,
  });
};

export const sendOtpEmail = async (
  userEmail: any,
  type: string,
  user_name: string
): Promise<number> => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  const message =
    type === "signup-otp"
      ? "Use the verification code below to complete the signup process."
      : "Use the verification code below to reset your password.";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "kumarishav812@gmail.com",
      pass: "aekfynxqsptodayr",
    },
  });

  const params = {
    from: {
      name: "Dummy Project",
      address: "kumarishav812@gmail.com",
    },
    to: userEmail.toLowerCase(),
    subject: "Dummy Project: Password reset code",
    text: `OTP : ${otp}`,
    html: ` <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
                .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
                .header { text-align: center; }
                .content { text-align: center; }
                .button { padding: 10px 20px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none; }
                .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><h2>Reset Your Password</h2></div>
                <div class="content">
                    <p>Hi ${userEmail.toLowerCase()},</p>
                    <p><strong>We received a request to reset your password.</strong></p>
                    <p><strong>Use this code to reset your password: </strong> ${otp}</p>
                </div>
                <div class="footer"><p>&copy; 2024 Your Company. All rights reserved.</p></div>
            </div>
        </body>
        </html>
        `,
  };
  await Sendmail(transporter, params);
  return otp;
};

const Sendmail = async (transporter: any, params: any) => {
  return await new Promise((resolve, reject) => {
    transporter.sendMail(params, function (err: any, data: any) {
      if (err) {
        if (typeof err === "object") {
          console.error(
            "Unable to send email. Error:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.error("Unable to send email. Error: ", err);
        }
        reject((error:any) => {
          console.log("query error", error);
        });
      } else {
        console.log("Email sent! Message ID: ", data.messageId);
        resolve({
          statusCode: 200,
          message: "Email sent successfully.",
          data,
        });
      }
    });
  });
};

export const DEFAULT_LIMIT = 5;
