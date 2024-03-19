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
const AuthService_1 = __importDefault(require("./AuthService"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../../AppError");
const Controller_1 = require("../../base/Controller");
class AuthController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield AuthService_1.default.login(email);
            if (!user) {
                return next(new AppError_1.AppError("Not found", 404, `Cannot find this email : ${email}`, true));
            }
            const isMatchPassword = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
            if (!isMatchPassword) {
                return next(new AppError_1.AppError("Wrong password", 404, `Password doesn't match`, true));
            }
            const token = user.generateAuthToken();
            res.status(200).json({ user, token });
        }));
        this.register = this.create;
    }
}
exports.default = new AuthController(AuthService_1.default);
