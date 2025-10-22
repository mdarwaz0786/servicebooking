import ContactEnquiryModel from "../../models/contactEnquiry.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// --------------------- CREATE CONTACT ENQUIRY ---------------------
export const createContactEnquiry = asyncHandler(async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !mobile || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const enquiry = await ContactEnquiryModel.create({ name, email, mobile, subject, message });

  return res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: enquiry });
});

