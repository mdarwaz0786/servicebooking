import AddressModel from "../../models/address.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Create address
export const createAddress = asyncHandler(async (req, res) => {
  const { houseNumber, landmark, deliveryPersonName, type } = req.body;

  if (!houseNumber || !houseNumber.trim()) {
    throw new ApiError(400, "House number is required");
  };

  const address = await AddressModel.create({
    userId: req.user?._id,
    houseNumber,
    landmark,
    deliveryPersonName,
    type,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: address });
});

// Get all addresses
export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await AddressModel.find({ userId: req.user?._id }).sort({ createdAt: -1 });
  return res.status(200).json({ success: true, data: addresses });
});

// Get single address by ID
export const getAddressById = asyncHandler(async (req, res) => {
  const address = await AddressModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!address) {
    throw new ApiError(404, "Address not found");
  };
  return res.status(200).json({ success: true, data: address });
});

// Update address
export const updateAddress = asyncHandler(async (req, res) => {
  const { houseNumber, landmark, deliveryPersonName, type } = req.body;

  const address = await AddressModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!address) {
    throw new ApiError(404, "Address not found");
  };

  address.houseNumber = houseNumber || address.houseNumber;
  address.landmark = landmark || address.landmark;
  address.deliveryPersonName = deliveryPersonName || address.deliveryPersonName;
  address.type = type || address.type;
  address.updatedBy = req.user?._id;

  await address.save();

  return res.status(200).json({ success: true, data: address });
});

// Delete address
export const deleteAddress = asyncHandler(async (req, res) => {
  const address = await AddressModel.findOne({ _id: req.params.id, userId: req.user?._id });
  if (!address) {
    throw new ApiError(404, "Address not found");
  };

  await address.deleteOne();

  return res.status(200).json({ success: true, message: "Address deleted successfully" });
});
