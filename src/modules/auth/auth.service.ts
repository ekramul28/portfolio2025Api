import config from "@/config";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import User from "../user/user.model";

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isMatch = await User.isPasswordMatched(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = User.createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return { token };
};

const register = () => {
  // Implement registration logic here
};

// get me
const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export default {
  login,
  register,
  getMe,
};
