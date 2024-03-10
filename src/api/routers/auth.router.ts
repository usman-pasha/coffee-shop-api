// import { Router } from "express";
// import authController from "../controllers/auth.controller";
// import { catchError } from "../core/catchError";
// import { verifyToken } from "../middlewares/auth";
// const authRouter = Router();

// authRouter.route("/regiter").post(catchError(authController.register));
// authRouter
//   .route("/phone-otp")
//   .post(catchError(authController.validatePhoneOTP));
// authRouter.route("/resent").post(catchError(authController.resentOTP));
// authRouter.route("/login").post(catchError(authController.login));
// authRouter
//   .route("/get")
//   .get(verifyToken, catchError(authController.getCurrentUser));

// export default authRouter;
