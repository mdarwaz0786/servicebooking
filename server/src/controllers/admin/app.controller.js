import asyncHandler from "../../helpers/asyncHandler.js";
import AppModel from "../../models/app.model.js";

export const upsertAppSettings = asyncHandler(async (req, res) => {
  const userId = req.user?._id || null;

  const {
    serviceman,
    user,
    status,
  } = req.body;

  const updateData = {
    serviceman,
    user,
    status,
    updatedBy: userId,
    updatedAt: new Date(),
  };

  const appSettings = await AppModel.findOneAndUpdate(
    {},
    {
      $set: updateData,
      $setOnInsert: {
        createdBy: userId,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: "App settings saved successfully",
    data: appSettings,
  });
});

export const getAppSettings = asyncHandler(async (req, res) => {
  const appSettings = await AppModel.findOne().lean();

  return res.status(200).json({
    success: true,
    data: appSettings,
  });
});

export const deleteAppSettings = asyncHandler(async (req, res) => {
  await AppModel.deleteMany({});

  return res.status(200).json({
    success: true,
    message: "App settings deleted successfully",
  });
});

