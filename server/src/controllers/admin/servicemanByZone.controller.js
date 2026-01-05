import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import ServiceManProfileModel from "../../models/servicemanProfile.model.js";
import ZoneModel from "../../models/zone.model.js";

export const getServicemenByZone = asyncHandler(async (req, res) => {
  const { lat, long, all } = req.query;

  let filter = {};

  if (all === "true") {
    const servicemen = await ServiceManProfileModel
      .find(filter)
      .lean();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      count: servicemen.length,
      data: servicemen,
    });
  };

  if (!lat || !long) {
    throw new ApiError(400, "lat and lng are required");
  };

  const latitude = parseFloat(lat);
  const longitude = parseFloat(long);

  const zone = await ZoneModel.findOne({
    status: true,
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    },
  }).select("_id");

  if (!zone) {
    return res.status(200).json({
      success: true,
      message: "No servicemen available in this zone",
      data: [],
    });
  };

  filter.zones = zone?._id;

  const servicemen = await ServiceManProfileModel
    .find(filter)
    .lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    zoneId: zone?._id,
    count: servicemen.length,
    data: servicemen,
  });
});
