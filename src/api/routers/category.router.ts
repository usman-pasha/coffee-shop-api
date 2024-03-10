import { Router } from "express";
import { catchError } from "../core/catchError";
import {
  verifyToken,
  authorizePermissions,
} from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter.route("/").get(catchError(categoryController.getAllCategories));
categoryRouter
  .route("/:cateId")
  .get(catchError(categoryController.getOneCategory));

categoryRouter.use(verifyToken);
categoryRouter
  .route("/create")
  .post(
    authorizePermissions("admin"),
    catchError(categoryController.createCategory)
  );

categoryRouter
  .route("/update/:categoryId")
  .patch(catchError(categoryController.updateCategory));

categoryRouter
  .route("/delete/:categoryId")
  .delete(catchError(categoryController.deleteCategory));

export default categoryRouter;
