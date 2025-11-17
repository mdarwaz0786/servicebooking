import BlogModel from "../../models/blog.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import BlogCategoryModel from "../../models/blogCategory.model.js";

// --------------------- GET ALL BLOGS ---------------------
export const getBlogs = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10, category } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [{ title: { $regex: search, $options: "i" } }];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (category) {
    filters.category = category;
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  


  const blogs = await BlogModel
    .find(filters)
    .populate("category", "name")
    .populate("createdBy updatedBy", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

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
    .findOne({slug:req.query.slug})
    .populate("category", "name")
    .populate("createdBy updatedBy", "name");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

    const categories = await BlogCategoryModel
      .find({status:true})
      .sort({createdAt: 1})      
      .lean();

      const blogs = await BlogModel
        .find({status:true})
        .sort({createdAt: -1}) 
        .populate("category", "name")
        .populate("createdBy updatedBy", "name")
        .limit(10)
        .lean();

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: blog,categories,
    blogs:blogs
   });
});

