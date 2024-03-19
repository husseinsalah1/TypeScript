"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("../base/Controller");
const CourseService_1 = __importDefault(require("./CourseService"));
class CourseController extends Controller_1.Controller {
}
exports.default = new CourseController(CourseService_1.default);
