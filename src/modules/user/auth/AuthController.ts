import { NextFunction, Request, Response } from "express";
import AuthService from "./AuthService";
import asyncHandler from "express-async-handler";
import { AppError } from "../../../AppError";
import { IUser } from "../userModel";
import { Controller } from "../../base/Controller";

class AuthController extends Controller<IUser> {
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user = await AuthService.login(email);
      if (!user) {
        return next(
          new AppError(
            "Not found",
            404,
            `Cannot find this email : ${email}`,
            true
          )
        );
      }
      const isMatchPassword = await user?.comparePassword(password);
      if (!isMatchPassword) {
        return next(
          new AppError("Wrong password", 404, `Password doesn't match`, true)
        );
      }
      const token = user.generateAuthToken();
      res.status(200).json({ user, token });
    }
  );

  register = this.create;
}

export default new AuthController(AuthService);
