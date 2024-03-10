// import logger from "../core/log";
// import responser from "../core/responser";
// import { Request, Response } from "express";
// import authService from "../services/auth.service";

// class authController {
//   async register(req: Request, res: Response) {
//     logger.info("registration starting");
//     const reqData: any = req.body;
//     const data: any = await authService.register(reqData);
//     return responser.send(
//       200,
//       "Customer Register Successfully",
//       req,
//       res,
//       data
//     );
//   }

//   async validatePhoneOTP(req: Request, res: Response) {
//     logger.info("validate Phone OTP starting");
//     const reqData: any = req.body;
//     const data: any = await authService.validatePhoneOTP(reqData);
//     return responser.send(
//       200,
//       "Validate Phone OTP Successfully",
//       req,
//       res,
//       data
//     );
//   }
//   async resentOTP(req: Request, res: Response) {
//     logger.info("Resent OTP starting");
//     const reqData: any = req.body;
//     const data: any = await authService.resendOTP(reqData);
//     return responser.send(200, "Successfully Resent Otp send", req, res, data);
//   }
//   async login(req: Request, res: Response) {
//     logger.info("login starting");
//     const reqData: any = req.body;
//     const data: any = await authService.login(reqData);
//     return responser.send(
//       200,
//       "Customer logged In Successfully",
//       req,
//       res,
//       data
//     );
//   }
//   async getCurrentUser(req: Request, res: Response) {
//     logger.info("getCurrentUser starting");
//     const userId: any = res.locals.userId;
//     const data: any = await authService.getCurrentUser(userId);
//     return responser.send(
//       200,
//       "Logged In Customer Fetched Successfully",
//       req,
//       res,
//       data
//     );
//   }
// }

// export default new authController();
