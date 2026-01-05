import TransactionModel from "../../models/transaction.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Get All Transaction + Summary
export const getTransactions = asyncHandler(async (req, res) => {
  let {
    search,
    status,
    sort = "desc",
    page,
    limit,
    from,
    month,
    year,
  } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
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

  if (month && year) {
    filters.createdAt = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    };
  } else if (year && !month) {
    filters.createdAt = {
      $gte: new Date(year, 0, 1),
      $lt: new Date(Number(year) + 1, 0, 1),
    };
  } else if (month && !year) {
    filters.$expr = {
      $eq: [{ $month: "$createdAt" }, Number(month)],
    };
  };

  let sortOption = { createdAt: -1 };
  if (sort === "asc") sortOption = { createdAt: 1 };

  const transactions = await TransactionModel
    .find(filters)
    .populate("user")
    .populate({
      path: "PID",
      model: "Booking",
      strictPopulate: false,
    })
    .populate({
      path: "itemData.serviceId",
      model: "Service",
      strictPopulate: false,
    })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TransactionModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const startOfLastThreeMonths = new Date(
    now.getFullYear(),
    now.getMonth() - 2,
    1
  );

  const summaryAgg = await TransactionModel.aggregate([
    {
      $match: {
        status: "success",
        ...(from && { from }),
      },
    },
    {
      $facet: {
        overall: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              amount: { $sum: "$finalAmount" },
            },
          },
        ],
        thisWeek: [
          { $match: { createdAt: { $gte: startOfWeek } } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              amount: { $sum: "$finalAmount" },
            },
          },
        ],
        thisMonth: [
          { $match: { createdAt: { $gte: startOfMonth } } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              amount: { $sum: "$finalAmount" },
            },
          },
        ],
        thisYear: [
          { $match: { createdAt: { $gte: startOfYear } } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              amount: { $sum: "$finalAmount" },
            },
          },
        ],
        lastThreeMonths: [
          { $match: { createdAt: { $gte: startOfLastThreeMonths } } },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              amount: { $sum: "$finalAmount" },
            },
          },
        ],
      },
    },
  ]);

  const safe = (arr) => arr?.[0] || { count: 0, amount: 0 };

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
    summary: {
      overall: safe(summaryAgg[0].overall),
      thisWeek: safe(summaryAgg[0].thisWeek),
      thisMonth: safe(summaryAgg[0].thisMonth),
      thisYear: safe(summaryAgg[0].thisYear),
      lastThreeMonths: safe(summaryAgg[0].lastThreeMonths),
    },
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
