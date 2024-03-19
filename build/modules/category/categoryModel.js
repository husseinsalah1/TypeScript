"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Category name is required"],
        min: [3, "Category name is too short"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Category must has owner"],
    },
});
categorySchema.pre("save", function (next) {
    this.slug = (0, slugify_1.default)(this.name);
    next();
});
const CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = CategoryModel;
