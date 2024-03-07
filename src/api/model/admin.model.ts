import { Schema, model } from "mongoose";

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  accountType: string;
  phoneNumber: number;
  emailIsVerified: boolean;
  phoneIsVerified: boolean;
  status: string;
  createdBy: string;
  updatedBy: string;
}

export const adminSchema = new Schema<Admin>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    accountType: { type: String, required: true, default: "admin" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    emailIsVerified: { type: Boolean, default: false },
    phoneIsVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "inactive",
    },
    createdBy: { type: String, default: "system" },
    updatedBy: { type: String, default: "system" },
  },
  {
    timestamps: true,
  }
);

export const adminModel = model<Admin>("admin", adminSchema);

// {
//     toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },
//     timestamps: true,
//   }
