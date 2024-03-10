import { Router } from "express";
import { catchError } from "../core/catchError";
import {
  verifyToken,
  authorizePermissions,
} from "../middlewares/auth.middleware";
import * as productController from "../controllers/product.controller";

const productRouter = Router();

productRouter
  .route("/getAllProduct")
  .get(catchError(productController.getAllProducts));

productRouter
  .route("/getOneProduct/:productId")
  .get(catchError(productController.getOneProduct));

productRouter
  .route("/featuredProduct")
  .get(catchError(productController.featuredProduct));

productRouter.use(verifyToken);
productRouter
  .route("/create")
  .post(
    authorizePermissions("admin"),
    catchError(productController.createProduct)
  );
productRouter
  .route("/updateProduct/:productId")
  .patch(catchError(productController.updateProduct));

productRouter
  .route("/deleteProduct/:productId")
  .delete(catchError(productController.deleteProduct));

export default productRouter;
