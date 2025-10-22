import ContactEnquiryModel from "../../models/contactEnquiry.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL CONTACT ENQUIRIES ---------------------
export const getContactEnquiries = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const enquiries = await ContactEnquiryModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ContactEnquiryModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Enquiries fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: enquiries,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE CONTACT ENQUIRY ---------------------
export const getContactEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiryModel.findById(req.params.id).lean();

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  return res.status(200).json({ success: true, data: enquiry });
});

// --------------------- DELETE CONTACT ENQUIRY ---------------------
export const deleteContactEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiryModel.findById(req.params.id);
  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  await enquiry.deleteOne();

  return res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
});
