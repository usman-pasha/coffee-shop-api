import { Router } from "express";
import { catchError } from "../core/catchError";
import {
  verifyToken,
  authorizePermissions,
} from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";
const categoryRouter = Router();

categoryRouter
  .route("/create")
  .post(
    verifyToken,
    authorizePermissions("admin"),
    catchError(categoryController.createCategory)
  );
categoryRouter.route("/").get(catchError(categoryController.getAllCategories));

categoryRouter
  .route("/:cateId")
  .get(catchError(categoryController.getOneCategory));

export default categoryRouter;
