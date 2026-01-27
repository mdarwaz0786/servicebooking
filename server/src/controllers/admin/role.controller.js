import Role from "../../models/role.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// create
export const createRole = asyncHandler(async (req, res) => {
  const { roleName, departmentName, permissions } = req.body;

  const role = await Role.create({
    roleName,
    departmentName,
    permissions,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
});

// get all
export const getRoles = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { roleName: { $regex: search, $options: "i" } },
      { departmentName: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  const sortOption = sort === "asc"
    ? { createdAt: 1 }
    : { createdAt: -1 };

  const roles = await Role.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Role.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: roles,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get single
export const getRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  };

  return res.status(200).json({
    success: true,
    message: "Role fetched successfully",
    data: role,
  });
});

// update
export const updateRole = asyncHandler(async (req, res) => {
  const { roleName, departmentName, permissions, status } = req.body;

  const role = await Role.findById(req.params.id);
  if (!role) {
    throw new ApiError(404, "Role not found");
  };

  role.roleName = roleName ?? role.roleName;
  role.departmentName = departmentName ?? role.departmentName;
  role.permissions = permissions ?? role.permissions;
  role.status = typeof status === "boolean" ? status : role.status;
  role.updatedBy = req.user?._id;
  role.updatedAt = new Date();

  await role.save();

  return res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
});

// delete
export const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  await role.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Role deleted successfully",
  });
});
