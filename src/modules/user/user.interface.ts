import { JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";

export type IUserRole = "super-admin" | "admin" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: IUserRole;
}

export interface IUserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  createToken(
    jwtPayload: JwtPayload,
    secret: string,
    expiresIn: string,
  ): string;

  verifyToken(token: string, secret: string): JwtPayload;

  findUserByProperty(key: string, value: string): Promise<IUser>;
}
