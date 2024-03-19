import { Model, Schema, model } from "mongoose";
import UserModel from "./../user/userModel";
import CategoryModel from "../category/categoryModel";
import slugify from "slugify";

export interface ICourse {
  name?: string;
  slug?: string;
  description?: string;
  about?: string[];
  hours?: number;
  duration?: string;
  image?: string;
  classes?: string;
  attends?: number;
  price?: number;
  isHasOffer?: boolean;
  offer?: number;
  startOfferDate?: Date;
  endOfferDate?: Date;
  category?: typeof CategoryModel;
  userId?: typeof UserModel;
}
interface ICourseMethods {}
interface Course extends Model<ICourse, {}, ICourseMethods> {}

const courseSchema = new Schema<ICourse, Course, ICourseMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [3, "Course name is too short"],
      max: [64, "Course name is too long"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    about: {
      type: [String],
    },
    image: String,
    hours: {
      type: Number,
      required: [true, "hours is required"],
    },
    duration: {
      type: String,
    },
    classes: {
      type: String,
    },
    attends: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    isHasOffer: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Number,
      default: 0,
    },
    startOfferDate: {
      type: Date,
      default: new Date(),
    },
    endOfferDate: {
      type: Date,
      default: new Date(),
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Course must has owner"],
    },
  },
  { timestamps: true }
);

courseSchema.pre("save", function (req, next) {});
const CourseModel = model<ICourse, Course>("Course", courseSchema);

export default CourseModel;
