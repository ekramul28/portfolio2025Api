import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import categoryService from "./category.service";

const create = catchAsync(async (req, res) => {
  const result = await categoryService.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await categoryService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: data,
    meta: pagination,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.updateOne(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteOne(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category deleted successfully",
    data: result,
  });
});

export default {
  create,
  getAll,
  updateOne,
  deleteOne,
};
