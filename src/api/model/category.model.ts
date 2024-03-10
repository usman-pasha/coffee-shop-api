import { model, Schema, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
export interface Category extends Document {
  categoryName: string;
  description: string;
  createdBy: string | Schema.Types.ObjectId;
  updatedBy: string | Schema.Types.ObjectId;
}

const categorySchema = new Schema<Category>(
  {
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "admin" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "admin" },
  },
  { timestamps: true }
);

categorySchema.plugin(paginate);

export const categoryModel: PaginateModel<Category> = model<
  Category,
  PaginateModel<Category>
>("category", categorySchema);
