"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../../base/Service");
const AuthRepository_1 = __importDefault(require("./AuthRepository"));
class AuthService extends Service_1.Service {
    login(email) {
        return AuthRepository_1.default.login(email);
    }
}
exports.default = new AuthService(AuthRepository_1.default);
