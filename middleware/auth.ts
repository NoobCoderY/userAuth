import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";

//**********************************check authorization*********************************/

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }
  }

  jwt.verify(token, process.env.JWT_KEY, (err:any, user) => {
    if (err) {
      return next(new ErrorHandler(err, 401));
    }
    req.user = user;
    next();
  });
};
