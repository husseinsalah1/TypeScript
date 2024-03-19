"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../AppError");
const UserService_1 = __importDefault(require("../modules/user/UserService"));
const ErrorName = "Unauthorized";
const isAuthenticated = (authorizedUsers) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError_1.AppError(ErrorName, 401, "Access denied. No token provided.", true));
    }
    // Extract Token
    const token = authHeader.split(" ")[1]; // Token => Bearer asjkdgasdkjasgdaksjdasgdjksad
    if (!token) {
        return next(new AppError_1.AppError(ErrorName, 401, "Access denied. No token provided.", true));
    }
    // Verify Token
    const SECRET_KEY = process.env.SECRET_KEY || "HusseinSec";
    const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
    const user = (yield UserService_1.default.findOne(decoded.userId));
    if (!user) {
        return next(new AppError_1.AppError(ErrorName, 401, "Invalid token. User not found.", true));
    }
    if (!authorizedUsers.includes(user.role) && user.token !== token) {
        return next(new AppError_1.AppError(ErrorName, 405, "Access denied. Yor are not allowed", true));
    }
    req.user = user;
    next();
});
exports.default = isAuthenticated;
