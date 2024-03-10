import AppError from "../core/appError";
import logger from "../core/log";
import { v4 as uuidv4 } from "uuid";
import { productModel, Product } from "../model/product.model";
import { categoryModel } from "../model/category.model";
import APIFeatures from "../core/apiFeature";
const { ObjectId } = require("mongodb");

const requiredFields = async (body: any) => {
  logger.info(`Creating Object...`);
  if (!body.productName) {
    throw new AppError(400, "Required Prameters");
  }
  if (!body.amount) {
    throw new AppError(400, "Required Amount Value");
  }
  if (!body.categoryId) {
    throw new AppError(400, "Required CategoryId");
  }
  if (!body.quantity) {
    throw new AppError(400, "Required Quantity");
  }
  if (body.categoryId) {
    body.categoryId = new ObjectId(body.categoryId);
    const cat: any = await categoryModel.findOne({ _id: body.categoryId });
    if (!cat) throw new AppError(404, "Category Id Not Found");
    // if (!cat) delete body.categoryId;
  }
  const payload: Partial<Product> = {
    categoryId: body.categoryId,
    amount: body.amount,
    featured: body.featured,
    productCode: uuidv4(),
    createdBy: body.userId,
    updatedBy: body.userId,
  };
  if (body.productName) payload.productName = body.productName;
  if (body.description) payload.description = body.description;
  if (body.quantity) payload.quantity = parseInt(body.quantity);
  return payload;
};

// create product
export const createProduct = async (body: any) => {
  logger.info("creating Product");
  const payload: any = await requiredFields(body);
  logger.data("object", payload);
  const record = await productModel.create(payload);
  return record;
};

// get all products
export const getAllProducts = async (query: any) => {
  logger.info("get all Products");
  const populateQuery = [
    { path: "createdBy", select: ["_id", "email", "userName"] },
    { path: "updatedBy", select: ["_id", "email", "userName"] },
    { path: "categoryId", select: ["_id", "categoryName"] },
  ];
  const record = await new APIFeatures(query)
    .filters()
    .orRegexFieldSearch("searchFilter", query)
    .sort()
    .paginate()
    .populate(populateQuery)
    .exec(productModel);
  return record.data;
};

// get single product
export const getOneProduct = async (productId: any) => {
  logger.info("get one product");
  const populateQuery = [
    { path: "createdBy", select: ["_id", "email", "userName"] },
    { path: "updatedBy", select: ["_id", "email", "userName"] },
    { path: "categoryId", select: ["_id", "categoryName"] },
  ];
  const record: any | null = await productModel
    .findOne({ _id: productId })
    .populate(populateQuery);
  return record;
};

// UPDATE PRODUCT
export const updateProduct = async (productId: any, body: any) => {
  logger.info("update one product");
  let updateData: any = {
    updatedBy: body.userId,
  };
  const condition = {
    _id: new ObjectId(productId),
  };
  const product = await productModel.findOne(condition);
  if (!product) throw new AppError(404, "Product is not found");
  if (body.productName) updateData.productName = body.productName;
  if (body.description) updateData.description = body.description;
  if (body.quantity) updateData.quantity = body.quantity;
  if (body.categoryId) {
    body.categoryId = new ObjectId(body.categoryId);
    const cat: any = await categoryModel.findOne({ _id: body.categoryId });
    if (!cat) throw new AppError(404, "Category Id Not Found");
    updateData.categoryId = cat._id;
  }
  if (body.featured) updateData.featured = Boolean(body.featured);
  if (body.amount) updateData.amount = parseFloat(body.amount);
  logger.data("payload", updateData);
  const option = { new: true };
  const record: any | null = await productModel.findOneAndUpdate(
    { _id: product._id },
    updateData,
    option
  );
  return record;
};

// delete product
export const deleteProduct = async (productId: any) => {
  logger.info("delete Product");
  const condition: any = { _id: new ObjectId(productId) };
  const record: any = await productModel.findOneAndDelete(condition);
  if (!record) throw new AppError(404, "Product is not found");
  return true;
};

// isfeatured == true product Fetched
export const isfeatured = async () => {
  logger.info("Get All Is Featured Product");
  const condition = {
    featured: true,
  };
  const populateQuery = [
    { path: "createdBy", select: ["_id", "email", "userName"] },
    { path: "updatedBy", select: ["_id", "email", "userName"] },
    { path: "categoryId", select: ["_id", "categoryName"] },
  ];
  const record = await productModel.find(condition).populate(populateQuery);
  return record;
};
