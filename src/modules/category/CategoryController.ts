import { NextFunction, Request, Response } from "express";
import CategoryService from "./CategoryService";
import asyncHandler from "express-async-handler";
import { ICategory } from "./categoryModel";
import { AppError } from "../../AppError";
import { Controller } from "../base/Controller";

class CategoryController extends Controller<ICategory> {
  override create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as ICategory;
    data.userId = req.user.id;
    const item = (await this.service.create(data)) as any;
    await item.save();
    res.status(200).json({ item });
  });

  override findOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let item = await this.service.findOne(id);
      if (!item) {
        return next(
          new AppError("Not found", 404, `Cannot find this id : ${id}`, true)
        );
      }
      item = await item.populate({ path: "userId", select: "name" });
      res.status(200).json({ item });
    }
  );
}

export default new CategoryController(CategoryService);
