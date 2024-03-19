"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./UserController"));
const UserValidation_1 = __importDefault(require("./UserValidation"));
const isAuthenticated_1 = __importDefault(require("../../middlewares/isAuthenticated"));
const userModel_1 = require("./userModel");
const userRouter = (0, express_1.Router)();
const userValidation = new UserValidation_1.default();
userRouter.post("/", (0, isAuthenticated_1.default)([userModel_1.UserRole.admin]), userValidation.inputUser, userValidation.isEmailExist, UserController_1.default.create);
userRouter.get("/", UserController_1.default.find);
userRouter.get("/:id", userValidation.isMongoId, UserController_1.default.findOne);
userRouter.delete("/:id", userValidation.isMongoId, UserController_1.default.delete);
// Update User
userRouter.put("/:id", (0, isAuthenticated_1.default)([userModel_1.UserRole.admin, userModel_1.UserRole.assistant]), userValidation.allowedUpdatedUserInput, userValidation.isEmailExist, UserController_1.default.update);
exports.default = userRouter;
