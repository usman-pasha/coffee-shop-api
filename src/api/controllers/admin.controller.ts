import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import * as adminService from "../services/admin.service";

export const adminRegister = async (req: Request, res: Response) => {
  logger.info("admin registration starting");
  const data: any = await adminService.createAdmin();
  logger.info(data);
  return responser.send(200, "Admin Register Successfully", req, res, data);
};

export const adminLogin = async (req: Request, res: Response) => {
  logger.info("admin login starting");
  const data: any = await adminService.login(req?.body);
  logger.info(data);
  return responser.send(200, "Admin Login Successfully", req, res, data);
};
