import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import skillService from "./skill.service";

const create = catchAsync(async (req, res) => {
  const result = await skillService.create(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { data, pagination } = await skillService.getAll(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully",
    data: data,
    meta: pagination,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await skillService.updateOne(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully",
    data: result,
  });
});

export default {
  create,
  getAll,
  updateOne,
};
