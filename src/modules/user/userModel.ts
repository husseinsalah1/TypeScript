import { Schema, model, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import slugify from "slugify";
export enum UserRole {
  admin = "admin",
  assistant = "assistant",
  user = "user",
}
//creating an interface
export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  slug?: string;
  role: UserRole;
  token?: string;
}
interface IUserMethods {
  comparePassword(password: string): boolean;
  generateAuthToken(): string;
}

interface User extends Model<IUser, {}, IUserMethods> {}

const userSchema = new Schema<IUser, User, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password is too short"],
      max: [64, "Password is too long"],
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.user,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// @desc generateAuth Token

userSchema.method("generateAuthToken", function generateAuthToken(): string {
  const user = this;
  const payload = {
    userId: user._id,
    email: user.email,
  };
  const SECRET_KEY = process.env.SECRET_KEY || "HusseinSec";
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "200h",
  });

  user.token = token;
  user.save();
  return token;
});

// @desc Hash password using bcrypt
async function hashPassword(value: string) {
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(value, saltRounds);

  return hash;
}

// @desc Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

userSchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});
// @desc Compare password

userSchema.method(
  "comparePassword",
  async function comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }
);

const UserModel = model<IUser, User>("User", userSchema);

export default UserModel;
