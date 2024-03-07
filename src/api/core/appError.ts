class AppError extends Error {
  statusCode: number;
  message: any;
  optionalMessage?: any;
  mergeOptional: boolean;
  status: string;
  isOperational: boolean;

  constructor(
    statusCode: number = 500,
    message: any = "something went wrong",
    optionalMessage?: any,
    mergeOptional: boolean = false
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.optionalMessage = optionalMessage;
    this.mergeOptional = mergeOptional;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;