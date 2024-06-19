import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = <string>req.headers["authorization"];
    const userToken = token?.split(" ")[1];
    const verifyuser:any = jwt.verify(userToken, process.env.JWT_SECRET_KEY as string); 
    if(verifyuser){
      req.body.user_id = verifyuser.user_id;
    }
    next();
  } catch (error:any) {
    console.log("Token verification failed:", error.message);
    res.json({ error: "Token verification failed" });
  }
};

