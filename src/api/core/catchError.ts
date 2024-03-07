import { Request, Response, NextFunction } from "express";

export const catchError = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
