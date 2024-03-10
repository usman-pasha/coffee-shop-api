// import AppError from "../core/appError";
// import prisma from "../core/db";
// import logger from "../core/log";
// import { signToken } from "../middlewares/token";
// import { v4 as uuidv4 } from "uuid";
// import { generateOTP } from "../utils/util";
// import { decryptData, encryptData } from "../middlewares/encryption";
// import userService from "./user.service";

// class authService {
//   //register
//   async register(body: any) {
//     logger.info("Creating Register");
//     if (!body.email || !body.password || !body.phone) {
//       throw new AppError(400, "Required Parameters!");
//     }
//     const isEmailExist = await userService.getRecord({ email: body.email });
//     if (isEmailExist) {
//       throw new AppError(400, "Email Already Exist");
//     }
//     const isPhoneExist = await userService.getRecord({
//       phoneNumber: body.phone,
//     });
//     if (isPhoneExist) throw new AppError(400, "Phone Number already Exists");
//     const password: any = encryptData(body.password);
//     const uniqueUserName = `CUS${uuidv4()
//       .toUpperCase()
//       .replace(/-/g, "")
//       .substring(0, 9)}`;
//     const payload: any = {
//       uuid: uuidv4(),
//       firstName: body.firstName,
//       lastName: body.lastName,
//       email: body.email,
//       username: uniqueUserName,
//       password: password,
//       status: "inactive",
//       phoneNumber: body.phone,
//       emailOtp: generateOTP().toString(), // Convert OTP to string
//       phoneOtp: generateOTP().toString(), // Convert OTP to string
//       otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
//     };
//     const user: any = await userService.createRecord(payload);
//     const record: any = {
//       id: user.id,
//       uuid: user.uuid,
//       fullName: `${user.firstName}-${user.lastName}`,
//       email: user.email,
//       username: user.username,
//       accountType: user.accountType,
//       phoneNumber: user.phoneNumber,
//       status: user.status,
//     };
//     logger.data(`user created`, record);
//     return record;
//   }

//   // Function to validate OTP
//   validatePhoneOTP = async (body: any) => {
//     logger.info("Validate Phone OTP");
//     const filter = { phoneNumber: body.phone };
//     const user = await prisma.user.findUnique({ where: filter });
//     if (!user) {
//       throw new AppError(404, "user Not Found");
//     }
//     if (!body.phoneOTP || !body.phone) {
//       throw new AppError(404, "Required Parameters ");
//     }
//     // Check if OTP is expired
//     const currentTimeStamp = Date.now();
//     const otpExpiryTimeStamp = user.otpExpiry.getTime();
//     if (currentTimeStamp > otpExpiryTimeStamp) {
//       await prisma.user.update({
//         where: { id: user.id },
//         data: {
//           phoneOtp: null,
//           otpExpiry: null,
//         },
//       });
//       throw new AppError(404, "OTP Expired");
//     }
//     // Check if entered OTP matches the stored OTP
//     if (body.phoneOTP !== String(user.phoneOtp))
//       throw new AppError(404, "OTP Not Matched");
//     // Clear OTP and expiry after successful validation
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         phoneIsVerified: true,
//         phoneOtp: null,
//         otpExpiry: null,
//         status: "active",
//       },
//     });
//     return `OTP Validation Successful Done ${user.phoneNumber} !`;
//   };

//   // Function to resend OTP
//   resendOTP = async (body: any) => {
//     logger.info("START:Resend OTP Started");
//     // Generate a new OTP
//     const newOTP = generateOTP();
//     const newExpiry = new Date(Date.now() + 5 * 60 * 1000);
//     const filter = { phoneNumber: body.phone };
//     const user = await prisma.user.findUnique({ where: filter });
//     if (!user) {
//       throw new AppError(404, "user Not Found");
//     }
//     if (user.phoneIsVerified !== false) {
//       throw new AppError(400, "Already Phone Is Verified");
//     }
//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         phoneOtp: newOTP.toString(),
//         otpExpiry: newExpiry,
//       },
//     });
//     return `Successfully New OTP Sent To ${user.phoneNumber} !`;
//   };

//   // Function to login
//   async login(body: any) {
//     logger.info("login service started");
//     if (!body.phone && !body.email) {
//       throw new AppError(400, "Email Or Username is Required");
//     }
//     const user = await prisma.user.findFirst({
//       where: {
//         OR: [{ phoneNumber: body.phone }, { email: body.email }],
//       },
//     });
//     if (!user) {
//       throw new AppError(404, "User does not exist");
//     }
//     if (
//       (user.phoneIsVerified !== true || user.emailIsVerified !== true) &&
//       user.status !== "active"
//     ) {
//       throw new AppError(404, "Verify Phone or Email OTP First.Try again");
//     }

//     const dcrytPasword: any = decryptData(user.password);
//     if (dcrytPasword !== body.password) {
//       throw new AppError(401, "Invalid Password.Try again");
//     }
//     const loggedInUser = await prisma.user.findFirst({
//       where: { id: user.id },
//     });
//     const accessToken = signToken("access", user.id);
//     const refreshToken = signToken("refresh", user.id);
//     const record = {
//       id: loggedInUser.id,
//       username: loggedInUser.username,
//       fullName: `${loggedInUser.firstName}-${loggedInUser.lastName}`,
//       email: loggedInUser.email,
//       status: loggedInUser.status,
//       uuid: loggedInUser.uuid,
//       accountType: loggedInUser.accountType,
//       phoneNumber: loggedInUser.phoneNumber,
//       accessToken,
//       refreshToken,
//     };
//     return record;
//   }
  
//   // Function to getCurrentUser
//   async getCurrentUser(userId: any) {
//     logger.info("current user service started");
//     const loggedInUser = await prisma.user.findUnique({
//       where: { id: userId },
//     });
//     const record = {
//       id: loggedInUser.id,
//       username: loggedInUser.username,
//       fullName: `${loggedInUser.firstName}-${loggedInUser.lastName}`,
//       email: loggedInUser.email,
//       status: loggedInUser.status,
//       uuid: loggedInUser.uuid,
//       accountType: loggedInUser.accountType,
//       phoneNumber: loggedInUser.phoneNumber,
//     };
//     return record;
//   }
// }

// export default new authService();
