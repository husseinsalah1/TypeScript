import { Router } from "express";
import UserController from "./UserController";
import UserValidation from "./UserValidation";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { UserRole } from "./userModel";
const userRouter = Router();
const userValidation = new UserValidation();

userRouter.post(
  "/",
  isAuthenticated([UserRole.admin]),
  userValidation.inputUser,
  userValidation.isEmailExist,
  UserController.create
);
userRouter.get("/", UserController.find);

userRouter.get("/:id", userValidation.isMongoId, UserController.findOne);

userRouter.delete("/:id", userValidation.isMongoId, UserController.delete);
// Update User
userRouter.put(
  "/:id",
  isAuthenticated([UserRole.admin, UserRole.assistant]),
  userValidation.allowedUpdatedUserInput,
  userValidation.isEmailExist,

  UserController.update
);
export default userRouter;
