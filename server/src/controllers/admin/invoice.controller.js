import InvoiceModel from "../../models/invoice.model.js";
import { buildPagination } from "../../utils/pagination.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";

export const getInvoices = asyncHandler(async (req, res) => {
  let { type, customerId, serviceman, bookingId, search, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filter = {};

  if (type) filter.type = type;
  if (customerId) filter.customerId = customerId;
  if (serviceman) filter.providerId = serviceman;
  if (bookingId) filter.bookingId = bookingId;

  if (search) {
    filter.$or = [
      { type: { $regex: search, $options: "i" } },
      { "latestServicemanDetail.name": { $regex: search, $options: "i" } },
      { "bookingDetail.bookingId": { $regex: search, $options: "i" } },
    ];
  };

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  const invoices = await InvoiceModel
    .find(filter)
    .populate({
      path: "kyc",
      select: "status gstNumber",
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await InvoiceModel.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: invoices,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getInvoiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invoice = await InvoiceModel
    .findById(id)
    .populate({
      path: "kyc",
      select: "status gstNumber",
    })

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: invoice,
  });
});
