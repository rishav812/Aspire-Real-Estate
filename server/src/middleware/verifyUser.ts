import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = <string>req.headers["authorization"];
    console.log("req.headers[authorization]",req.headers["authorization"]);
    // console.log("token without split==",token,"  ",token.split(" ")[1]);
    const userToken = token?.split(" ")[1];
    // console.log("userTokennn===>>",userToken);
    // if (!userToken) {
    //   throw new Error("Token not provided");
    // }
    // console.log("userToken==>>",userToken);
    const verifyuser:any = jwt.verify(userToken, process.env.JWT_SECRET_KEY as string); 
    console.log("verifyUser",verifyuser);  
    if(verifyuser){
      req.body.user_id = verifyuser.user_id;
    }
    next();
  } catch (error:any) {
    console.error("Token verification failed:", error.message);
    res.json({ error: "Token verification failed" });
  }
};

