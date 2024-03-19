import { Router } from "express";
import CategoryController from "./CategoryController";
import isAuthenticated from "../../middlewares/isAuthenticated";
import { UserRole } from "../user/userModel";
import CategoryValidation from "./CategoryValidation";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  isAuthenticated([UserRole.admin, UserRole.assistant]),
  CategoryValidation.createCategory,
  CategoryValidation.isCategoryExist,
  CategoryController.create
);

categoryRouter.get("/", CategoryController.find);
categoryRouter.get(
  "/:id",
  CategoryValidation.isMongoId,
  CategoryController.findOne
);

categoryRouter.put("/:id", CategoryController.update);
export default categoryRouter;
