import { Request, Response, NextFunction } from "express";
import AppError from "../core/appError";
import jwt from "jsonwebtoken";
import logger from "../core/log";
import { catchError } from "../core/catchError";
import config from "../config";
import openDataBase from "../core/db";
import { adminModel } from "../model/admin.model";

export const verifyToken = catchError(
  async (req: Request | any, res: Response, next: NextFunction) => {
    await openDataBase();
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      throw new AppError(401, "Authorization header not found");
    }

    const bearerToken = bearerHeader.split(" ")[1];
    logger.data("token", bearerToken);

    const decoded: any = jwt.verify(bearerToken, config.jwt.accessSecretKey);
    logger.data("decoded", decoded);

    const createdate = new Date(decoded.iat * 1000);
    logger.data("createdate", createdate);

    const expires = new Date(decoded.exp * 1000);
    logger.data("expires", expires);

    const userId = decoded.id;

    const query = {
      where: {
        _id: userId,
      },
      select: {
        _id: true,
        accountType: true,
        userName: true,
      },
    };

    const user = await adminModel.findOne(query);
    if (!user) {
      throw new AppError(401, "Unauthorized");
    }
    logger.data("user", user);
    // res.locals.userId = userId;
    // res.locals.accountType = user.accountType;
    // res.locals.user = user;
    req.userId = userId;
    req.accountType = user.accountType;
    req.user = user;
    next();
  }
);

//
export const authorizePermissions = (...accountTypes: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!accountTypes.includes(res.locals.user.accountType)) {
      throw new AppError(
        401,
        `Your ${res.locals.user.accountType}`,
        "Unauthorized to access this route"
      );
    }
    next();
  };
};
