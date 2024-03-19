"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("./UserService"));
const Controller_1 = require("../base/Controller");
class UserController extends Controller_1.Controller {
}
exports.default = new UserController(UserService_1.default);
