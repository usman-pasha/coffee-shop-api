import { model, Schema, Types, Document, PaginateModel } from "mongoose";

import paginate from "mongoose-paginate-v2";
export interface Category extends Document {
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

categorySchema.plugin(paginate);

export const categoryModel: any = model<Category>("category", categorySchema);
