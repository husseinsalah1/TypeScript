import jwt from "jsonwebtoken";
import { IUser } from "../modules/user/userModel";
import { AppError } from "../AppError";
import { NextFunction, Request, Response } from "express";
import UserService from "../modules/user/UserService";
import { Schema } from "mongoose";
interface IUser_ extends IUser {
  id: Schema.Types.ObjectId;
}
declare module "express-serve-static-core" {
  interface Request {
    user: IUser_;
  }
}

const ErrorName = "Unauthorized";

const isAuthenticated =
  (authorizedUsers: string[] | string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError(ErrorName, 401, "Access denied. No token provided.", true)
      );
    }

    // Extract Token
    const token = authHeader.split(" ")[1]; // Token => Bearer asjkdgasdkjasgdaksjdasgdjksad
    if (!token) {
      return next(
        new AppError(ErrorName, 401, "Access denied. No token provided.", true)
      );
    }

    // Verify Token
    const SECRET_KEY: string = process.env.SECRET_KEY || "HusseinSec";
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = (await UserService.findOne((<any>decoded).userId)) as IUser_;
    if (!user) {
      return next(
        new AppError(ErrorName, 401, "Invalid token. User not found.", true)
      );
    }

    if (!authorizedUsers.includes(user.role) && user.token !== token) {
      return next(
        new AppError(ErrorName, 405, "Access denied. Yor are not allowed", true)
      );
    }

    req.user = user;
    next();
  };

export default isAuthenticated;
