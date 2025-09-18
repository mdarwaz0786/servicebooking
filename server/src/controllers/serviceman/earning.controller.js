import EarningModel from "../../models/earning.model.js";
import { buildPagination } from "../../utils/pagination.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Get All Earnings
export const getEarnings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10, sort = "desc", search, categoryId } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (categoryId) {
    filters.categoryId = categoryId;
  };

  if (search) {
    const schemaPaths = Object.keys(EarningModel.schema.paths);
    const orFilters = [];

    schemaPaths.forEach((field) => {
      const fieldType = EarningModel.schema.paths[field].instance;

      if (fieldType === "String") {
        orFilters.push({ [field]: { $regex: search, $options: "i" } });
      };

      if (fieldType === "Number" && !isNaN(Number(search))) {
        orFilters.push({ [field]: Number(search) });
      };

      if (fieldType === "Boolean") {
        if (search.toLowerCase() === "true") {
          orFilters.push({ [field]: true });
        };

        if (search.toLowerCase() === "false") {
          orFilters.push({ [field]: false });
        };
      };

      if (fieldType === "ObjectId" && mongoose.isValidObjectId(search)) {
        orFilters.push({ [field]: search });
      };
    });

    if (orFilters.length > 0) {
      filters.$or = orFilters;
    };
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const [earnings, total] = await Promise.all([
    EarningModel.find(filters)
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    EarningModel.countDocuments(filters),
  ]);

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
    data: earnings,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Earning by ID
export const getEarningById = asyncHandler(async (req, res) => {
  const earning = await EarningModel
    .findById(req.params.id)
    .populate("category")
    .lean();

  if (!earning) throw new ApiError(404, "Earning not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: earning,
  });
});