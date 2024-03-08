import logger from "../core/log";
import jsonData from "../scripts/admin.json";
import { decryptData, encryptData } from "../middlewares/encryption.middleware";
import { v4 as uuidv4 } from "uuid";
import { adminModel } from "../model/admin.model";
import AppError from "../core/appError";
import { signToken } from "../middlewares/token.middleware";

export const createAdmin = async () => {
  try {
    logger.info("Creating Admin From static ");
    const admins = JSON.parse(JSON.stringify(jsonData.admins));
    const bulkInsertData = admins.map((admin: any) => ({
      firstName: admin.firstName,
      lastName: admin.lastName,
      userName: `ADM${uuidv4()
        .toUpperCase()
        .replace(/-/g, "")
        .substring(0, 9)}`,
      password: encryptData(admin.password),
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      emailIsVerified: admin.emailIsVerified,
      phoneIsVerified: admin.phoneIsVerified,
      accountType: admin.accountType,
      status: admin.status,
    }));

    const existingEmails = await adminModel.distinct("email", {
      email: { $in: bulkInsertData.map((admin: any) => admin.email) },
    });
    const uniqueAdmins = bulkInsertData.filter(
      (admin: any) => !existingEmails.includes(admin.email)
    );

    if (uniqueAdmins.length === 0) {
      console.log("All admins already exist.");
      return;
    }
    const insert = await adminModel.insertMany(uniqueAdmins);
    console.log("Saved Admins:", insert.length);
    return insert;
  } catch (error) {
    console.log(error);
    return;
  }
};

// Function to login
export const login = async (body: any) => {
  logger.info("login service started");
  if (!body.phone && !body.email) {
    throw new AppError(400, "Email Or Phone is Required");
  }
  const user = await adminModel.findOne({
    $or: [{ phoneNumber: body.phone }, { email: body.email }],
  });
  if (!user) {
    throw new AppError(404, "User does not exist");
  }
  if (
    (user.phoneIsVerified !== true || user.emailIsVerified !== true) &&
    user.status !== "active"
  ) {
    throw new AppError(404, "Verify Phone or Email OTP First.Try again");
  }

  const dcrytPasword: any = decryptData(user.password);
  if (dcrytPasword !== body.password) {
    throw new AppError(401, "Invalid Password.Try again");
  }
  const loggedInUser = await adminModel.findOne({
    _id: user._id,
  });
  const accessToken = signToken("access", user._id);
  const refreshToken = signToken("refresh", user._id);
  const record = {
    id: loggedInUser._id,
    userName: loggedInUser.userName,
    fullName: `${loggedInUser.firstName}-${loggedInUser.lastName}`,
    email: loggedInUser.email,
    status: loggedInUser.status,
    accountType: loggedInUser.accountType,
    phoneNumber: loggedInUser.phoneNumber,
    accessToken,
    refreshToken,
  };
  return record;
};

export const getAdminProfile = async (loggedIn: any) => {
  logger.info("current user service started");
  const condition: object = {
    _id: loggedIn._id,
  };
  const loggedInUser = await adminModel.findOne(condition);
  const record = {
    _id: loggedInUser._id,
    userName: loggedInUser.userName,
    fullName: `${loggedInUser.firstName}-${loggedInUser.lastName}`,
    email: loggedInUser.email,
    status: loggedInUser.status,
    accountType: loggedInUser.accountType,
    phoneNumber: loggedInUser.phoneNumber,
  };
  return record;
};
