import { auth, validateRequest } from "@/middlewares";
import { Router } from "express";
import skillController from "./skill.controller";
import skillValidation from "./skill.validation";

const skillRouter: Router = Router();

skillRouter
  .route("/")
  .get(skillController.getAll)
  .post(
    auth("super-admin"),
    validateRequest(skillValidation.create),
    skillController.create,
  );

skillRouter
  .route("/:id")
  .patch(
    auth("super-admin"),
    validateRequest(skillValidation.update),
    skillController.updateOne,
  );

export default skillRouter;
