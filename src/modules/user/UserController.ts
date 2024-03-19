import { NextFunction, Request, Response } from "express";
import UserService from "./UserService";
import { IUser } from "./userModel";
import asyncHandler from "express-async-handler";
import { AppError } from "../../AppError";
import { Controller } from "../base/Controller";

export interface ReqQuery {
  page: number;
  limit: number;
  populate: string;
}
class UserController extends Controller<IUser> {}

export default new UserController(UserService);
