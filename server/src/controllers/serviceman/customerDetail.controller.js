import asyncHandler from "../../helpers/asyncHandler.js";
import ServiceManBookingModel from "../../models/servicemanBooking.model.js";
import UserModel from "../../models/user.model.js";

export const getCustomerDetail = asyncHandler(async (req, res) => {
  let { id } = req.params;

  const smbooking = await ServiceManBookingModel.findById(id).select("userId");

  if (!smbooking) {
    return res.status(404).json({
      success: false,
      message: "Serviceman booking not found",
    });
  };

  const user = await UserModel.findById(smbooking?.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  };

  const data = {
    mobile: user?.mobile,
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: data,
  });
});