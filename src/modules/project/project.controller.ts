import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import projectService from "./project.service";

const create = catchAsync(async (req, res) => {
  const result = await projectService.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await projectService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: data,
    meta: pagination,
  });
});

const getOne = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await projectService.getOne(slug, req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.updateOne(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await projectService.deleteOne(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

export default {
  create,
  getAll,
  updateOne,
  deleteOne,
  getOne,
};
