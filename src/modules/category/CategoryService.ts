import { Service } from "../base/Service";
import CategoryRepository from "./CategoryRepository";
import { ICategory } from "./categoryModel";

class CategoryService extends Service<ICategory> {
  getOneBySlug(slug: string) {
    return CategoryRepository.getOneBySlug(slug);
  }
}

export default new CategoryService(CategoryRepository);
