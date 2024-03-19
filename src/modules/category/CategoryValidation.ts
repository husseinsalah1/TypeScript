import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { ICategory } from "./categoryModel";
import { AppError } from "../../AppError";
import slugify from "slugify";
import CategoryService from "./CategoryService";

class CategoryValidation {
  createCategory(req: Request, res: Response, next: NextFunction) {
    let errors: { name?: string } = {};
    const categoryData = req.body as ICategory;
    categoryData.name = categoryData.name || "";

    if (!validator.isLength(categoryData.name, { min: 3 })) {
      errors.name = "Name is too short";
    }
    if (validator.isEmpty(categoryData.name)) {
      errors.name = "Name is required";
    }
    if (Object.keys(errors).length === 0) {
      next();
    } else {
      next(
        new AppError("Validation Errors", 403, "Form validation", true, errors)
      );
    }
  }

  async isCategoryExist(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const slug = slugify(name);
    const isExist = await CategoryService.getOneBySlug(slug);
    if (isExist) {
      return next(
        new AppError(
          "Duplicate Unique Key",
          409,
          `Category (${name}) is already exist`,
          true
        )
      );
    }

    next();
  }

  isMongoId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!validator.isMongoId(id)) {
      return next(new AppError("MongoId Error", 403, "Invalid user id", true));
    }

    next();
  }
}

export default new CategoryValidation();
