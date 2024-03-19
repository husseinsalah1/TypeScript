import validator from "validator";
import { IUser, UserRole } from "./userModel";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../AppError";
import UserService from "./UserService";
interface IUser_ extends IUser {
  confirmPass: string;
}
function compare(password: string, confirmPass: string) {
  if (password === confirmPass) {
    return true;
  }

  return false;
}
class UserValidation {
  inputUser(req: Request, res: Response, next: NextFunction) {
    let errors: {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      confirmPass?: string;
      role?: string;
    } = {};
    const userData = req.body as IUser_;
    userData.name = userData.name || "";
    userData.email = userData.email || "";
    userData.password = userData.password || "";
    userData.phone = userData.phone || "";
    userData.confirmPass = userData.confirmPass || "";
    if (validator.isEmpty(userData.name)) {
      errors.name = "Name is required";
    }
    if (validator.isEmpty(userData.email)) {
      errors.email = "Email is required";
    }
    if (!validator.isEmail(userData.email)) {
      errors.email = "Invalid Email";
    }
    if (validator.isEmpty(userData.phone)) {
      errors.phone = "Phone is required";
    }
    if (validator.isEmpty(userData.password)) {
      errors.password = "Password is required";
    }
    if (validator.isEmpty(userData.confirmPass)) {
      errors.confirmPass = "Confirm password is required";
    }
    if (!compare(userData.password, userData.confirmPass)) {
      errors.password = "Passwords don't match";
      errors.confirmPass = "Passwords don't match";
    }
    if (!(userData.role in UserRole)) {
      errors.role = "Invalid user role";
    }
    if (Object.keys(errors).length === 0) {
      next();
    } else {
      next(
        new AppError("Validation Errors", 403, "Form validation", true, errors)
      );
    }
  }

  isMongoId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!validator.isMongoId(id)) {
      return next(new AppError("MongoId Error", 403, "Invalid user id", true));
    }

    next();
  }

  async isEmailExist(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const isExist = await UserService.isEmailExist(email);
    if (isExist) {
      return next(
        new AppError(
          "Duplicate Unique Key",
          409,
          "Email is already exist",
          true
        )
      );
    }

    next();
  }

  allowedUpdatedUserInput(req: Request, res: Response, next: NextFunction) {
    const allowedUpdate = [
      "name",
      "phone",
      "email",
      "role",
      "password",
      "confirmPassword",
    ];
    const requestedUpdate = Object.keys(req.body);
    const isReqAllowed = requestedUpdate.every((value) =>
      allowedUpdate.includes(value)
    );

    if (!isReqAllowed) {
      return next(
        new AppError("Not allowed inputs", 403, "Not supported update", true)
      );
    }

    next();
  }
}

export default UserValidation;
