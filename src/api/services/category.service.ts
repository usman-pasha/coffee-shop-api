import AppError from "../core/appError";
import logger from "../core/log";
import { categoryModel } from "../model/category.model";

class categoryService {
  async createCategory(body: any) {
    logger.info("creating category");
    if (!body.categoryName) throw new AppError(400, "Required Category Name");
    const payload: any | null = {
      categoryName: body.categoryName,
      description: body.description,
      createdBy: body.userId,
      updatedBy: body.userId,
    };
    const record = await categoryModel.create(payload);
    return record;
  }

  async getAllCategories() {
    logger.info("get all categories");
    const populateQuery = [
      { path: "createdBy", select: ["_id", "email", "userName"] },
      { path: "updatedBy", select: ["_id", "email", "userName"] },
    ];
    const record: any | null = await categoryModel
      .find({})
      .populate(populateQuery);
    return record;
  }

  async getOneCategory(categoryId: any) {
    logger.info("get one category");
    const populateQuery = [
      { path: "createdBy", select: ["_id", "email", "userName"] },
      { path: "updatedBy", select: ["_id", "email", "userName"] },
    ];
    const record: any | null = await categoryModel
      .findOne({ _id: categoryId })
      .populate(populateQuery);
    return record;
  }
}

export default new categoryService();
