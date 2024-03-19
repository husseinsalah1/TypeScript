import { Model } from "mongoose";
import CategoryModel from "./categoryModel";
import { ICategory } from "./categoryModel";
import { Repository } from "../base/Repository";

class CategoryRepository extends Repository<ICategory> {
  getOneBySlug(slug: string) {
    return CategoryModel.findOne({ slug });
  }
}

export default new CategoryRepository(CategoryModel);
