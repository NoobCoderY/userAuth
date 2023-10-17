import { UserType } from "../model/userModel"
import { Response } from "express";
import jwt from "jsonwebtoken"
export const sendToken = (user:UserType, statusCode:number, res:Response) => {
    const Accesstoken =generateAccessToken(user)
    const refreshToken=generateRefreshToken(user)

    res.status(statusCode).json({
      success: true,
    Accesstoken: Accesstoken,
    refreshToken:refreshToken
    });
};
  
export const generateRefreshToken = (user: UserType) => {
    return jwt.sign({
        id:user.id,
        name: user.name,
    }, process.env.JWT_KEY, { expiresIn: '30m' });
};
  
export const generateAccessToken = (user: UserType) => {
    return jwt.sign({
        id:user.id,
        name: user.name,
    }, process.env.JWT_KEY, { expiresIn: '7d' });
  };