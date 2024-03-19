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
const AppError_1 = require("../../AppError");
const slugify_1 = __importDefault(require("slugify"));
const CategoryService_1 = __importDefault(require("./CategoryService"));
class CategoryValidation {
    createCategory(req, res, next) {
        let errors = {};
        const categoryData = req.body;
        categoryData.name = categoryData.name || "";
        if (!validator_1.default.isLength(categoryData.name, { min: 3 })) {
            errors.name = "Name is too short";
        }
        if (validator_1.default.isEmpty(categoryData.name)) {
            errors.name = "Name is required";
        }
        if (Object.keys(errors).length === 0) {
            next();
        }
        else {
            next(new AppError_1.AppError("Validation Errors", 403, "Form validation", true, errors));
        }
    }
    isCategoryExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const slug = (0, slugify_1.default)(name);
            const isExist = yield CategoryService_1.default.getOneBySlug(slug);
            if (isExist) {
                return next(new AppError_1.AppError("Duplicate Unique Key", 409, `Category (${name}) is already exist`, true));
            }
            next();
        });
    }
    isMongoId(req, res, next) {
        const { id } = req.params;
        if (!validator_1.default.isMongoId(id)) {
            return next(new AppError_1.AppError("MongoId Error", 403, "Invalid user id", true));
        }
        next();
    }
}
exports.default = new CategoryValidation();
