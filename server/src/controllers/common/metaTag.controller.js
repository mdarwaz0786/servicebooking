import MetaTagModel from "../../models/metaTag.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- GET ALL META TAGS ---------------------
export const getMetaTags = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { pageName: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
      { metaTitle: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true" || status === true;
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const metaTags = await MetaTagModel.find(filters)
    .populate("createdBy updatedBy", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await MetaTagModel.countDocuments(filters);
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
    data: metaTags,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET META TAG BY SLUG ---------------------
export const getMetaTagBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const metaTag = await MetaTagModel.findOne({ slug })
    .populate("createdBy updatedBy", "name");

  if (!metaTag) {
    throw new ApiError(404, "Meta tag not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: metaTag,
  });
});


