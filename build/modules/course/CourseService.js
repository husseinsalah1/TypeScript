"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../base/Service");
const CourseRepository_1 = __importDefault(require("./CourseRepository"));
class CourseService extends Service_1.Service {
}
exports.default = new CourseService(CourseRepository_1.default);
