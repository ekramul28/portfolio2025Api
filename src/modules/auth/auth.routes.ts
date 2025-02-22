import { auth, validateRequest } from "@/middlewares";
import { Router } from "express";
import authController from "./auth.controller";
import authValidation from "./auth.validation";

const authRouter: Router = Router();

authRouter.post(
  "/login",
  validateRequest(authValidation.login),
  authController.login,
);
authRouter.post(
  "/register",
  validateRequest(authValidation.register),
  authController.register,
);

authRouter.get("/me", auth("super-admin"), authController.getMe);

export default authRouter;
