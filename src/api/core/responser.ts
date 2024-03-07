import { Request, Response } from "express";

const isNumeric = (value: any) => /^-?\d+$/.test(value);
const isStatusCode = (statusCode: number) =>
  isNumeric(statusCode) && statusCode >= 100 && statusCode < 600;

const successResponse = (message: any, data: any, success: boolean) => ({
  status: "success",
  message: message,
  success,
  data,
  totals: Array.isArray(data) ? { count: data.length } : undefined,
});

const errorResponse = (message: any, error: any) => ({
  status: "error",
  message: message || "Unknown Error",
  ...(error.isOperational && error.mergeOptional
    ? { message: `${message} : ${error.optionalMessage}` }
    : { errorDetails: error.optionalMessage }),
  ...(error.dynamicMessage
    ? { message: error.dynamicMessage, errorDetails: error.data }
    : {}),
});

class Responser {
  static send = (
    statusCode: number,
    message: any,
    req: Request,
    res: Response,
    data: any,
    success = true
  ) => {
    statusCode = isStatusCode(statusCode) ? statusCode : 500;
    const responseData = `${statusCode}`.startsWith("2")
      ? successResponse(message, data, success)
      : `${statusCode}`.startsWith("4") || `${statusCode}`.startsWith("5")
      ? errorResponse(message, data)
      : undefined;

    console.log(
      `${success ? "Success" : "Error"} || ${message} || ${req.originalUrl}`
    );
    res.status(statusCode).send(responseData);
  };
}

export default Responser;
