import mongoose, { model, Schema, Types } from "mongoose";

export interface Category {
  id: string;
  categoryName: string;
  description: string;
  createdBy: string | Types.ObjectId;
  updatedBy: string | Types.ObjectId;
}

const categorySchema = new Schema<Category>({
  categoryName: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "admin" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "admin" },
});

export const categoryModel = model<Category>("category", categorySchema);
