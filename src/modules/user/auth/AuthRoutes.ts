import { Router } from "express";
import AuthController from "./AuthController";
import UserValidation from "../UserValidation";
const authRouter = Router();
const userValidation = new UserValidation();

authRouter.post("/login", AuthController.login);
authRouter.post(
  "/register",
  userValidation.isEmailExist,
  AuthController.register
);
export default authRouter;
