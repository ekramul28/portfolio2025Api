import { auth, validateRequest } from "@/middlewares";
import { Router } from "express";
import categoryController from "./category.controller";
import categoryValidation from "./category.validation";

const categoryRouter: Router = Router();

categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post(
    auth("super-admin"),
    validateRequest(categoryValidation.create),
    categoryController.create,
  );

categoryRouter
  .route("/:id")
  .delete(auth("super-admin"), categoryController.deleteOne)
  .patch(
    auth("super-admin"),
    validateRequest(categoryValidation.update),
    categoryController.updateOne,
  );

export default categoryRouter;
