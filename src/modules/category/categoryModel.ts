import { Schema, model } from "mongoose";
import slugify from "slugify";

export interface ICategory {
  name: string;
  slug: string;
  userId: Schema.Types.ObjectId;
}
const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    trim: true,
    required: [true, "Category name is required"],
    min: [3, "Category name is too short"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Category must has owner"],
  },
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
