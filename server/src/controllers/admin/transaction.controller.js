
import TransactionModel from "../../models/transaction.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get All Transaction
export const getTransactions = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
    from,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { phone: { $regex: search, $options: "i" } },
      { transactionId: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status;
  };

  if (from) {
    filters.from = from;
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  let transactions = await TransactionModel
    .find(filters)
    .populate("user")
    .populate({
      path: "PID",
      model: "Booking",
      select: "",
      strictPopulate: false,
    })
    .populate({
      path: "itemData.serviceId",
      model: "Service",
      select: "",
      strictPopulate: false,
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TransactionModel.countDocuments(filters);
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
    data: transactions,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Transaction Detail
export const getTransactionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await TransactionModel
    .findById(id)
    .populate("user")
    .populate({
      path: "PID",
      model: "Booking",
      select: "",
      strictPopulate: false,
    })
    .populate({
      path: "itemData.serviceId",
      model: "Service",
      select: "",
      strictPopulate: false,
    })
    .lean();

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: transaction,
  });
});
