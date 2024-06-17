import { Request, Response, NextFunction } from "express";
import validate from "../utils/validators";

export const schemaValidation =
  (ValidationSchema: any) =>
  (...apiHeaders: [Request, Response, NextFunction]) => {
    validate(apiHeaders[0].body, ValidationSchema)
      .then(() => {
        // console.log("next=====>",apiHeaders[2]())
        apiHeaders[2]()
      })
      .catch((err: string) => {
        console.log("err===>",err);
        apiHeaders[1].send(err)
      });
  };
