import { multerUpload } from "@/config/multer.config";
import { validateRequest } from "@/middlewares";
import { catchAsync } from "@/utils";
import { Router } from "express";
import auth from "./../../middlewares/auth";
import blogController from "./blog.controller";
import blogValidation from "./blog.validation";

const blogRouter: Router = Router();

blogRouter
  .route("/")
  .get(blogController.getAll)
  .post(
    auth("super-admin"),
    multerUpload.single("image"),
    catchAsync((req, _res, next) => {
      if (req.file?.path) {
        req.body.data = JSON.stringify({
          ...JSON.parse(req.body.data),
          cover: req.file.path,
        });
      }

      if (typeof req.body.data === "string" && req.body.data.trim()) {
        req.body = { ...JSON.parse(req.body.data) };
      } else {
        req.body = {};
      }
      next();
    }),
    validateRequest(blogValidation.create),
    blogController.create,
  );

// get single blog by the slug
blogRouter.get("/:slug", blogController.getOne);

blogRouter
  .route("/:id")
  .delete(auth("super-admin"), blogController.deleteOne)
  .patch(
    auth("super-admin"),
    multerUpload.single("image"),
    catchAsync((req, _res, next) => {
      if (req.file?.path) {
        req.body.data = JSON.stringify({
          ...JSON.parse(req.body.data),
          cover: req.file.path,
        });
      }

      if (typeof req.body.data === "string" && req.body.data.trim()) {
        req.body = { ...JSON.parse(req.body.data) };
      } else {
        req.body = {};
      }
      next();
    }),
    validateRequest(blogValidation.update),
    blogController.updateOne,
  );

export default blogRouter;
