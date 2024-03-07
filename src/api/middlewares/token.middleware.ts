import jwt from "jsonwebtoken";
import config from "../config";

export const signToken = (type: string, id: any) => {
  let validity;
  let secretKey;
  switch (type) {
    case "access":
      validity = config.jwt.accessValidity;
      secretKey = config.jwt.accessSecretKey;
      break;
    case "refresh":
      validity = config.jwt.refreshValidity;
      secretKey = config.jwt.refreshSecretKey;
      break;
    default:
      throw new Error("invalid Token");
  }
  return jwt.sign({ id }, secretKey, { expiresIn: validity });
};
