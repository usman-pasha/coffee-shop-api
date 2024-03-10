import logger from "../core/log";
import responser from "../core/responser";
import { Request, Response } from "express";
import categoryService from "../services/category.service";

class categoryController {
  async createCategory(req: Request | any, res: Response) {
    logger.info("category starting");
    const reqData: any = req.body;
    reqData.userId = req.userId;
    const data: any = await categoryService.createCategory(reqData);
    return responser.send(200, "Category Created Successfully", req, res, data);
  }

  async getAllCategories(req: Request, res: Response) {
    logger.info("get All Categories starting");
    const data: any = await categoryService.getAllCategories(req.query);
    return responser.send(
      200,
      "Successfully Fetched All Categories",
      req,
      res,
      data
    );
  }

  async getOneCategory(req: Request, res: Response) {
    logger.info("get One Category starting");
    const params = req.params.cateId;
    const data: any = await categoryService.getOneCategory(params);
    return responser.send(
      200,
      "Successfully Fetched Single Category",
      req,
      res,
      data
    );
  }

  updateCategory = async (req: Request | any, res: Response) => {
    logger.info("Update Category starting");
    const reqData = req.body;
    reqData.userId = req.userId;
    const params = req.params.categoryId;
    const data: any = await categoryService.updateCategory(params, reqData);
    return responser.send(200, "Successfully Category Updated", req, res, data);
  };

  deleteCategory = async (req: Request, res: Response) => {
    logger.info("Delete Category starting");
    const params = req.params.categoryId;
    const data: any = await categoryService.deleteCategory(params);
    return responser.send(200, "Successfully Category Deleted", req, res, data);
  };
}

export default new categoryController();
