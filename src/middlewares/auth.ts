import config from "@/config";
import { IUserRole } from "@/modules/user/user.interface";
import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized Access",
        data: undefined,
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string,
    ) as JwtPayload;

    if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Access Forbidden",
        data: undefined,
      });
    }

    req.user = decoded;
    next();
  });
};

export default auth;
