import { catchAsync, sendResponse } from "@/utils";
import httpStatus from "http-status";
import dashboardService from "./dashboard.service";

const getOverview = catchAsync(async (req, res) => {
  const result = await dashboardService.getOverview();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard overview retrieved successfully",
    data: result,
  });
});

export default {
  getOverview,
};
