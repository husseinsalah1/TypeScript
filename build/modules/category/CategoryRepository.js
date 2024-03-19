"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("./categoryModel"));
const Repository_1 = require("../base/Repository");
class CategoryRepository extends Repository_1.Repository {
    getOneBySlug(slug) {
        return categoryModel_1.default.findOne({ slug });
    }
}
exports.default = new CategoryRepository(categoryModel_1.default);
