import { multerUpload } from "@/config/multer.config";
import { auth, validateRequest } from "@/middlewares";
import { catchAsync } from "@/utils";
import { Router } from "express";
import projectController from "./project.controller";
import projectValidation from "./project.validation";

const projectRouter: Router = Router();

projectRouter
  .route("/")
  .get(projectController.getAll)
  .post(
    auth("super-admin"),
    multerUpload.fields([
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    catchAsync((req, _res, next) => {
      // console.log(req.files && req?.files["cover"][0]);
      // console.log(req.files && req?.files["images"]);

      if (req.files && req?.files["cover"][0] && req?.files["images"].length) {
        const imagePaths = (
          req?.files["images"] as { fieldname: string; path: string }[]
        ).map((file) => file.path);

        req.body.data = JSON.stringify({
          ...JSON.parse(req.body.data || "{}"),
          cover: req.files && req?.files["cover"][0].path,
          images: imagePaths,
        });
      }

      if (typeof req.body.data === "string" && req.body.data.trim()) {
        req.body = { ...JSON.parse(req.body.data) };
      } else {
        req.body = {};
      }

      next();
    }),
    validateRequest(projectValidation.create),
    projectController.create,
  );

// get the single project by the slug
projectRouter.get("/:slug", projectController.getOne);

projectRouter
  .route("/:id")
  .delete(auth("super-admin"), projectController.deleteOne)
  .patch(
    auth("super-admin"),
    multerUpload.fields([
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    catchAsync((req, _res, next) => {
      // console.log(req.files && req?.files["cover"][0]);
      // console.log(req.files && req?.files["images"]);

      // Initialize `parsedData` with `data` from the request or an empty object
      let parsedData = {};
      if (req.body.data && typeof req.body.data === "string") {
        parsedData = JSON.parse(req.body.data);
      }

      // Handle `cover` file if it exists
      if (req.files && req?.files["cover"]?.[0]?.path) {
        parsedData = {
          ...parsedData,
          cover: req.files["cover"][0].path,
        };
      }

      // Handle `images` files if they exist
      if (req.files && req?.files["images"]?.length) {
        const imagePaths = (
          req.files["images"] as { fieldname: string; path: string }[]
        ).map((file) => file.path);

        parsedData = {
          ...parsedData,
          images: imagePaths,
        };
      }

      // Update `req.body` with the final parsed data
      req.body = parsedData;

      next();
    }),
    validateRequest(projectValidation.update),
    projectController.updateOne,
  );

export default projectRouter;
