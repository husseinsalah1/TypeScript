"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = require("../base/Repository");
const courseModel_1 = __importDefault(require("./courseModel"));
class CourseRepository extends Repository_1.Repository {
}
exports.default = new CourseRepository(courseModel_1.default);
