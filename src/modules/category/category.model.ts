import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
    },
    brief: {
      type: String,
      required: [true, "Brief is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const Category = model<ICategory>("Category", categorySchema);
export default Category;
