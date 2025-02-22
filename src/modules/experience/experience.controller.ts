import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import experienceService from "./experience.service";

const create = catchAsync(async (req, res) => {
  const result = await experienceService.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Experience created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await experienceService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experiences retrieved successfully",
    data: data,
    meta: pagination,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await experienceService.updateOne(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience updated successfully",
    data: result,
  });
});

export default {
  create,
  getAll,
  updateOne,
};
