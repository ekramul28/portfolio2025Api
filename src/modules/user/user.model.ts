import config from "@/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";
import { UserRoles } from "./user.constant";
import { IUser, IUserModel } from "./user.interface";

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: UserRoles,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isPasswordMatched = function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.createToken = function (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

userSchema.statics.verifyToken = function (token: string, secret: string) {
  return jwt.verify(token, secret);
};

userSchema.statics.findUserByProperty = function (key: string, value: string) {
  return this.findOne({ [key]: value });
};

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
