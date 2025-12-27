import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import SupportContentModel from "../../models/support.model.js";

export const upsertSupportContent = asyncHandler(async (req, res) => {
  const payload = req.body;

  let supportContent = await SupportContentModel.findOne();

  if (supportContent) {
    Object.keys(payload).forEach((key) => {
      supportContent[key] = payload[key];
    });

    supportContent.updatedBy = req.user?._id;
    supportContent.updatedAt = new Date();
    await supportContent.save();

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: supportContent,
    });
  };

  supportContent = await SupportContentModel.create({
    ...payload,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: supportContent,
  });
});

export const getSupportContent = asyncHandler(async (req, res) => {
  const supportContent = await SupportContentModel.findOne();

  if (!supportContent) {
    return res.status(200).json({
      success: true,
      message: "No support content found",
      data: null,
    });
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: supportContent,
  });
});

export const deleteSupportContent = asyncHandler(async (req, res) => {
  const content = await SupportContentModel.findOne();
  if (!content) throw new ApiError(404, "Support content not found");
  await content.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
