import ServicemanBookingUploadModel from "../../models/servicemanBookingUploads.model.js";
import compressImage from "../../helpers/compressImage.js";
import compressVideo from "../../helpers/compressVideo.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import fs from "fs";

export const createServicemanBookingUpload = asyncHandler(async (req, res) => {
  const { servicemanId, servicemanBookingId } = req.body;
  const userId = req.user?._id;

  if (!servicemanId || !servicemanBookingId) {
    throw new ApiError(400, "servicemanId and servicemanBookingId are required");
  };

  let uploadedImages = [];
  let uploadedVideos = [];

  try {
    uploadedImages = req.files?.images
      ? await Promise.all(
        req.files.images.map((file) => compressImage(file.buffer, "servicemanBookingImages"))
      )
      : [];

    uploadedVideos = req.files?.videos
      ? await Promise.all(
        req.files.videos.map((file) => compressVideo(file.buffer, "servicemanBookingVideos"))
      )
      : [];

    const uploadDoc = await ServicemanBookingUploadModel.create({
      servicemanId,
      servicemanBookingId,
      images: uploadedImages,
      videos: uploadedVideos,
      createdBy: userId || null,
      updatedBy: userId || null,
    });

    return res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      data: uploadDoc,
    });
  } catch (error) {
    [...uploadedImages, ...uploadedVideos].forEach((filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        };
      } catch (cleanupErr) {
        console.error("Failed to remove file:", filePath, cleanupErr);
      };
    });

    throw new ApiError(500, error.message || "File upload failed");
  };
});
