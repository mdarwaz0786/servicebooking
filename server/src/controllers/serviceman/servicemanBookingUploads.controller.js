import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import compressImage from "../../helpers/compressImage.js";
import compressVideo from "../../helpers/compressVideo.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import fs from "fs";

// Helper to resolve servicemanId
const getServicemanId = async (servicemanId, userId) => {
  if (servicemanId) return servicemanId;

  const profile = await ServiceManProfileModel.findOne({ userId }).lean();
  if (!profile) throw new ApiError(404, "Serviceman profile not found");

  return profile?._id;
};

// Upload images and videos before start
export const uploadBeforeStartMedia = asyncHandler(async (req, res) => {
  let { servicemanId, servicemanBookingId } = req.params;
  const userId = req.user?._id;

  if (!servicemanBookingId) {
    throw new ApiError(400, "servicemanBookingId is required");
  };

  servicemanId = await getServicemanId(servicemanId, userId);

  let uploadedImages = [];
  let uploadedVideos = [];

  try {
    uploadedImages = req.files?.images
      ? await Promise.all(req.files.images.map((file) => compressImage(file.buffer, "servicemanBookingImages")))
      : [];

    uploadedVideos = req.files?.videos
      ? await Promise.all(req.files.videos.map((file) => compressVideo(file.buffer, "servicemanBookingVideos")))
      : [];

    const booking = await ServiceManBookingModel.findOneAndUpdate(
      { _id: servicemanBookingId, servicemanId },
      {
        $push: {
          beforeStartImages: { $each: uploadedImages },
          beforeStartVideos: { $each: uploadedVideos },
        },
        updatedBy: userId || null,
      },
      { new: true }
    );

    if (!booking) throw new ApiError(404, "Booking not found");

    return res.status(201).json({
      success: true,
      message: "Before start media uploaded successfully",
      data: booking,
    });
  } catch (error) {
    [...uploadedImages, ...uploadedVideos].forEach((filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (cleanupErr) {
        console.error("Failed to remove file:", filePath, cleanupErr);
      };
    });

    throw new ApiError(500, error.message || "Failed to upload before start media");
  };
});

// Upload images and videos after complete
export const uploadAfterCompleteMedia = asyncHandler(async (req, res) => {
  let { servicemanId, servicemanBookingId } = req.params;
  const userId = req.user?._id;

  if (!servicemanBookingId) {
    throw new ApiError(400, "servicemanBookingId is required");
  };

  servicemanId = await getServicemanId(servicemanId, userId);

  let uploadedImages = [];
  let uploadedVideos = [];

  try {
    uploadedImages = req.files?.images
      ? await Promise.all(req.files.images.map((file) => compressImage(file.buffer, "servicemanBookingImages")))
      : [];

    uploadedVideos = req.files?.videos
      ? await Promise.all(req.files.videos.map((file) => compressVideo(file.buffer, "servicemanBookingVideos")))
      : [];

    const booking = await ServiceManBookingModel.findOneAndUpdate(
      { _id: servicemanBookingId, servicemanId },
      {
        $push: {
          afterCompleteImages: { $each: uploadedImages },
          afterCompleteVideos: { $each: uploadedVideos },
        },
        updatedBy: userId || null,
      },
      { new: true },
    );

    if (!booking) throw new ApiError(404, "Booking not found");

    return res.status(201).json({
      success: true,
      message: "After complete media uploaded successfully",
      data: booking,
    });
  } catch (error) {
    [...uploadedImages, ...uploadedVideos].forEach((filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (cleanupErr) {
        console.error("Failed to remove file:", filePath, cleanupErr);
      };
    });

    throw new ApiError(500, error.message || "Failed to upload after complete media");
  };
});

// Remove before strat images and videos
export const removeBeforeStartMedia = asyncHandler(async (req, res) => {
  let { servicemanId, servicemanBookingId } = req.params;
  const userId = req.user?._id;
  const { images = [], videos = [] } = req.body;

  if (!servicemanBookingId) {
    throw new ApiError(400, "servicemanBookingId is required");
  };

  servicemanId = await getServicemanId(servicemanId, userId);

  try {
    const booking = await ServiceManBookingModel.findOne({ _id: servicemanBookingId, servicemanId });
    if (!booking) throw new ApiError(404, "Booking not found");

    [...images, ...videos].forEach((filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error("Failed to delete file:", filePath, err);
      };
    });

    if (images.length) {
      booking.beforeStartImages = booking.beforeStartImages.filter((img) => !images.includes(img));
    };

    if (videos.length) {
      booking.beforeStartVideos = booking.beforeStartVideos.filter((vid) => !videos.includes(vid));
    };

    booking.updatedBy = userId || null;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Before start media removed successfully",
      data: booking,
    });
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to remove before start media");
  };
});

// Remove after complete images and videos
export const removeAfterCompleteMedia = asyncHandler(async (req, res) => {
  let { servicemanId, servicemanBookingId } = req.params;
  const userId = req.user?._id;
  const { images = [], videos = [] } = req.body;

  if (!servicemanBookingId) {
    throw new ApiError(400, "servicemanBookingId is required");
  };

  servicemanId = await getServicemanId(servicemanId, userId);

  try {
    const booking = await ServiceManBookingModel.findOne({ _id: servicemanBookingId, servicemanId });
    if (!booking) throw new ApiError(404, "Booking not found");

    [...images, ...videos].forEach((filePath) => {
      try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error("Failed to delete file:", filePath, err);
      };
    });

    if (images.length) {
      booking.afterCompleteImages = booking.afterCompleteImages.filter((img) => !images.includes(img));
    };

    if (videos.length) {
      booking.afterCompleteVideos = booking.afterCompleteVideos.filter((vid) => !videos.includes(vid));
    };

    booking.updatedBy = userId || null;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "After complete media removed successfully",
      data: booking,
    });
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to remove after complete media");
  };
});

