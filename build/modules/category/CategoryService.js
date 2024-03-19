"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../base/Service");
const CategoryRepository_1 = __importDefault(require("./CategoryRepository"));
class CategoryService extends Service_1.Service {
    getOneBySlug(slug) {
        return CategoryRepository_1.default.getOneBySlug(slug);
    }
}
exports.default = new CategoryService(CategoryRepository_1.default);
