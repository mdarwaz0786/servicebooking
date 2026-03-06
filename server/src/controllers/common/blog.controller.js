import BlogModel from "../../models/blog.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import BlogCategoryModel from "../../models/blogCategory.model.js";

// --------------------- GET ALL BLOGS ---------------------
export const getBlogs = asyncHandler(async (req, res) => {
  let {
    search,
    city,
    state,
    country,
    zipCode,
    sort = "desc",
    page = 1,
    limit = 10,
    category,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const now = new Date();

  const filters = {
    status: true,
  };

  if (search) {
    filters.$or = [{ title: { $regex: search, $options: "i" } }];
  };

  if (category) filters.category = category;
  if (city) filters.city = city;
  if (state) filters.state = state;
  if (country) filters.country = country;
  if (zipCode) filters.zipCode = zipCode;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const blogs = await BlogModel.aggregate([
    { $match: filters },

    // combine publishDate + publishTime
    {
      $addFields: {
        publishDateTime: {
          $dateFromString: {
            dateString: {
              $concat: [
                {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$publishDate",
                  },
                },
                "T",
                { $ifNull: ["$publishTime", "00:00"] },
                ":00",
              ],
            },
          },
        },
      },
    },

    // publish logic
    {
      $match: {
        $or: [
          { publishStatus: "published" },
          {
            $and: [
              { publishStatus: "scheduled" },
              { publishDateTime: { $lte: now } },
            ],
          },
        ],
      },
    },

    { $sort: sortOption },
    { $skip: skip },
    { $limit: limit },

    {
      $lookup: {
        from: "blogcategories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },

    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "users",
        localField: "updatedBy",
        foreignField: "_id",
        as: "updatedBy",
      },
    },
    { $unwind: { path: "$updatedBy", preserveNullAndEmptyArrays: true } },
  ]);

  const total = await BlogModel.countDocuments(filters);
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
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE BLOG ---------------------
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel
    .findOne({ slug: req.query.slug })
    .populate("category", "name")
    .populate("createdBy updatedBy", "name");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const categories = await BlogCategoryModel
    .find({ status: true })
    .sort({ createdAt: 1 })
    .lean();

  const blogs = await BlogModel
    .find({ status: true })
    .sort({ createdAt: -1 })
    .populate("category", "name")
    .populate("createdBy updatedBy", "name")
    .limit(10)
    .lean();

  return res.status(200).json({
    success: true, message: "Data fetched successfully", data: blog, categories,
    blogs: blogs
  });
});

