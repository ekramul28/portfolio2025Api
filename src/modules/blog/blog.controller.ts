import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import blogService from "./blog.service";

const create = catchAsync(async (req, res) => {
  const result = await blogService.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await blogService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: data,
    meta: pagination,
  });
});

const getOne = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await blogService.getOne(slug, req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogService.updateOne(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogService.deleteOne(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
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
