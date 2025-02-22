import { Router } from "express";
import { auth } from "@/middlewares";
import dashboardController from "./dashboard.controller";

const dashboardRouter: Router = Router();

dashboardRouter
  .route("/")
  .get(auth("super-admin"), dashboardController.getOverview);

export default dashboardRouter;
