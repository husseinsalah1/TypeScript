"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("./AuthController"));
const UserValidation_1 = __importDefault(require("../UserValidation"));
const authRouter = (0, express_1.Router)();
const userValidation = new UserValidation_1.default();
authRouter.post("/login", AuthController_1.default.login);
authRouter.post("/register", userValidation.isEmailExist, AuthController_1.default.register);
exports.default = authRouter;
