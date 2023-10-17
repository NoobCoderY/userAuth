import express, { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import User from "../model/userModel";
import {
  sendToken,
  generateRefreshToken,
  generateAccessToken,
} from "../utils/JwtToken";
import Jwt from "jsonwebtoken";
import { UserType } from "../model/userModel";

//**********************************Create User*********************************/

export const UserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      if (!name) {
        return next(new ErrorHandler("please send name", 400));
      } else {
        return next(new ErrorHandler("please send password", 400));
      }
    }

    const userExistCheck = await User.findOne({ name });
    if (userExistCheck) {
      return next(new ErrorHandler("user already exist", 400));
    }
    const user = await User.create({
      name,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 400));
  }
};

// **********************************Login*********************************/

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      if (!name) {
        return next(new ErrorHandler("please send name", 400));
      } else {
        return next(new ErrorHandler("please send password", 400));
      }
    }
    const user = await User.findOne({ name });

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 403));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 403));
    }
    //for send jwt token
    sendToken(user, 200, res);
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

// **********************************Access refresh token*********************************/

export const Refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.body;

  if (!accessToken || typeof accessToken !== "string") {
    return next(new ErrorHandler("invalid data", 401));
  }

  Jwt.verify(accessToken, process.env.JWT_KEY, (err:any, user) => {
    if (err) {
      return next(new ErrorHandler(err, 403));
    }
   console.log(user);
   
    const refreshToken = generateRefreshToken(user as UserType);
    const accessToken = generateAccessToken(user as UserType);
    res.status(200).json({ refreshToken, accessToken });
  });
};

// **********************************Get All Users*********************************/

export const GetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      message: "success",
      users,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};
