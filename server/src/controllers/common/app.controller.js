import asyncHandler from "../../helpers/asyncHandler.js";
import AppModel from "../../models/app.model.js";

export const getAppSettings = asyncHandler(async (req, res) => {
  const appSettings = await AppModel.findOne().select("serviceman user").lean();

  return res.status(200).json({
    success: true,
    data: appSettings,
    message: "Data fetched successfully",
  });
});

