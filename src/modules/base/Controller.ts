import { AppError } from "../../AppError";
import CategoryService from "../category/CategoryService";
import { ICategory } from "../category/categoryModel";
import { ReqQuery } from "../user/UserController";
import UserService from "../user/UserService";
import { IRead, IWrite } from "./BaseInterface";
import { Service } from "./Service";
import { NextFunction, Request } from "express";
import { Response } from "express";
import asyncHandler from "express-async-handler";

export abstract class Controller<T> {
  constructor(public service: Service<T>) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const data: T = req.body;
    const item = (await this.service.create(data)) as any;

    await item.save();
    res.status(200).json({ item });
  });

  find = (populate: { path: string; select: string }) =>
    asyncHandler(async (req: Request<{}, {}, {}, ReqQuery>, res: Response) => {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 5 || 5;
      const skip = (page - 1) * limit;
      let items = await this.service.find({}, skip, limit, populate);

      res.status(200).json({ length: items?.length, page, skip, items });
    });

  findOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const item = await this.service.findOne(id);

      if (!item) {
        return next(
          new AppError("Not found", 404, `Cannot find this id : ${id}`, true)
        );
      }

      res.status(200).json({ item });
    }
  );

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const item = await this.service.delete(id);
      if (!item) {
        return next(
          new AppError("Not found", 404, `Cannot find this id : ${id}`, true)
        );
      }

      res.status(200).send();
    }
  );

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const item = (await this.service.findOne(id)) as any;
      if (!item) {
        return next(
          new AppError("Not found", 404, `Cannot find this id : ${id}`, true)
        );
      }

      Object.keys(req.body).forEach(
        (update: string) => (item[update] = req.body[update])
      );

      await item.save();
      res.status(200).json({ item });
    }
  );
}
