// Package Imports

import logger from "./log";
import responser from "./responser";
import { Request, Response, NextFunction } from "express";
// Custom Imports

const sendError = (err: any, req: Request, res: Response) => {
  if (err.isOperational) {
    return responser.send(err.statusCode, err.message, req, res, err);
  } else {
    logger.error("ERROR 💥", err);
    return responser.send(500, "something went wrong!!", req, res, err);
  }
};
export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = err;
  sendError(error, req, res);
};
