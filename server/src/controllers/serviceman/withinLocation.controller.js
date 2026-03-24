import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";

const toRadians = (degree) => degree * (Math.PI / 180);

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
};

export const checkServicemanNearby = asyncHandler(async (req, res) => {
  const {
    servicemanLat,
    servicemanLng,
    userLat,
    userLng
  } = req.body;

  if (
    !servicemanLat ||
    !servicemanLng ||
    !userLat ||
    !userLng
  ) {
    throw new ApiError(400, "Lat and long are required for both customer and serviceman");
  }

  const distance = getDistance(
    servicemanLat,
    servicemanLng,
    userLat,
    userLng
  );

  const isNearby = distance <= 7000;

  const data = {
    nearby: isNearby,
    distance: parseInt(distance.toFixed(2)),
    distanceCheck: 7000
  }

  return res.status(200).json({
    success: true,
    message: isNearby ? "Serviceman is within 7 KM" : "Serviceman is not nearby",
    data,
  });
});
