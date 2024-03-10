import { model, Schema, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Product extends Document {
  productName: string;
  description: string;
  status: "PENDING" | "REJECTED" | "ACTIVATED" | "DELETED";
  categoryId: Schema.Types.ObjectId;
  amount: number;
  gstPercentage?: number;
  quantity: number;
  featured: boolean;
  mainPicture?: string;
  productPictures: { img: string }[];
  productCode: string;
  ratings: { star: number; postedBy: Schema.Types.ObjectId }[];
  totalRatings: number;
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
}

const productSchema = new Schema<Product>(
  {
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      default: "ACTIVATED",
      enum: ["PENDING", "REJECTED", "ACTIVATED", "DELETED"],
    },
    categoryId: { type: Schema.Types.ObjectId, ref: "category" },
    amount: { type: Number, required: true },
    gstPercentage: { type: Number },
    quantity: { type: Number, default: 1 },
    featured: { type: Boolean, default: false },
    mainPicture: { type: String },
    productPictures: [{ img: { type: String } }],
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.Types.ObjectId, ref: "admin" },
      },
    ],
    totalRatings: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "admin" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "admin" },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

export const productModel: PaginateModel<Product> = model<
  Product,
  PaginateModel<Product>
>("product", productSchema);
