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
const validator_1 = __importDefault(require("validator"));
const userModel_1 = require("./userModel");
const AppError_1 = require("../../AppError");
const UserService_1 = __importDefault(require("./UserService"));
function compare(password, confirmPass) {
    if (password === confirmPass) {
        return true;
    }
    return false;
}
class UserValidation {
    inputUser(req, res, next) {
        let errors = {};
        const userData = req.body;
        userData.name = userData.name || "";
        userData.email = userData.email || "";
        userData.password = userData.password || "";
        userData.phone = userData.phone || "";
        userData.confirmPass = userData.confirmPass || "";
        if (validator_1.default.isEmpty(userData.name)) {
            errors.name = "Name is required";
        }
        if (validator_1.default.isEmpty(userData.email)) {
            errors.email = "Email is required";
        }
        if (!validator_1.default.isEmail(userData.email)) {
            errors.email = "Invalid Email";
        }
        if (validator_1.default.isEmpty(userData.phone)) {
            errors.phone = "Phone is required";
        }
        if (validator_1.default.isEmpty(userData.password)) {
            errors.password = "Password is required";
        }
        if (validator_1.default.isEmpty(userData.confirmPass)) {
            errors.confirmPass = "Confirm password is required";
        }
        if (!compare(userData.password, userData.confirmPass)) {
            errors.password = "Passwords don't match";
            errors.confirmPass = "Passwords don't match";
        }
        if (!(userData.role in userModel_1.UserRole)) {
            errors.role = "Invalid user role";
        }
        if (Object.keys(errors).length === 0) {
            next();
        }
        else {
            next(new AppError_1.AppError("Validation Errors", 403, "Form validation", true, errors));
        }
    }
    isMongoId(req, res, next) {
        const { id } = req.params;
        if (!validator_1.default.isMongoId(id)) {
            return next(new AppError_1.AppError("MongoId Error", 403, "Invalid user id", true));
        }
        next();
    }
    isEmailExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const isExist = yield UserService_1.default.isEmailExist(email);
            if (isExist) {
                return next(new AppError_1.AppError("Duplicate Unique Key", 409, "Email is already exist", true));
            }
            next();
        });
    }
    allowedUpdatedUserInput(req, res, next) {
        const allowedUpdate = [
            "name",
            "phone",
            "email",
            "role",
            "password",
            "confirmPassword",
        ];
        const requestedUpdate = Object.keys(req.body);
        const isReqAllowed = requestedUpdate.every((value) => allowedUpdate.includes(value));
        if (!isReqAllowed) {
            return next(new AppError_1.AppError("Not allowed inputs", 403, "Not supported update", true));
        }
        next();
    }
}
exports.default = UserValidation;
