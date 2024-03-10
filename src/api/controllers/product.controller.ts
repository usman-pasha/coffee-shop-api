import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (req: Request | any, res: Response) => {
  logger.info("Product starting");
  const reqData: any = req.body;
  reqData.userId = req.userId;
  const data: any = await productService.createProduct(reqData);
  return responser.send(200, "Product Created Successfully", req, res, data);
};

export const getAllProducts = async (req: Request, res: Response) => {
  logger.info("get All Products starting");
  const data: any = await productService.getAllProducts(req.query);
  return responser.send(
    200,
    "Successfully Fetched All Products",
    req,
    res,
    data
  );
};

export const getOneProduct = async (req: Request, res: Response) => {
  logger.info("get One Product starting");
  const params = req.params.productId;
  const data: any = await productService.getOneProduct(params);
  return responser.send(
    200,
    "Successfully Fetched One Product",
    req,
    res,
    data
  );
};

export const updateProduct = async (req: Request | any, res: Response) => {
  logger.info("Update Product starting");
  const reqData = req.body;
  reqData.userId = req.userId;
  const params = req.params.productId;
  const data: any = await productService.updateProduct(params, reqData);
  return responser.send(200, "Successfully Product Updated", req, res, data);
};

export const deleteProduct = async (req: Request, res: Response) => {
  logger.info("Delete Product starting");
  const params = req.params.productId;
  const data: any = await productService.deleteProduct(params);
  return responser.send(200, "Successfully Product Deleted", req, res, data);
};

export const featuredProduct = async (req: Request, res: Response) => {
  logger.info("featured Product starting");
  const data: any = await productService.isfeatured();
  return responser.send(
    200,
    "Successfully Fetched Featured Products",
    req,
    res,
    data
  );
};
