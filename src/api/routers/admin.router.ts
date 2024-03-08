import { Router } from "express";
import { catchError } from "../core/catchError";
import {
  verifyToken,
  authorizePermissions,
} from "../middlewares/auth.middleware";
import * as adminController from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.route("/").get(catchError(adminController.adminRegister));
adminRouter.route("/login").post(catchError(adminController.adminLogin));

export default adminRouter;
