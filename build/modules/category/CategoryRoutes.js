"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("./CategoryController"));
const isAuthenticated_1 = __importDefault(require("../../middlewares/isAuthenticated"));
const userModel_1 = require("../user/userModel");
const CategoryValidation_1 = __importDefault(require("./CategoryValidation"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("/", (0, isAuthenticated_1.default)([userModel_1.UserRole.admin, userModel_1.UserRole.assistant]), CategoryValidation_1.default.createCategory, CategoryValidation_1.default.isCategoryExist, CategoryController_1.default.create);
categoryRouter.get("/", CategoryController_1.default.find);
categoryRouter.get("/:id", CategoryValidation_1.default.isMongoId, CategoryController_1.default.findOne);
categoryRouter.put("/:id", CategoryController_1.default.update);
exports.default = categoryRouter;
