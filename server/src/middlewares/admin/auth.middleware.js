// import jwt from "jsonwebtoken";
// import User from "../../models/user.model.js";
// import ApiError from "../../helpers/apiError.js";
// import asyncHandler from "../../helpers/asyncHandler.js";

// const isLoggedIn = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     throw new ApiError(401, "Authentication token missing.");
//   };

//   const token = authHeader.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   const user = await User.findById(decoded.id).populate("permissions").select("-password");

//   if (!user) {
//     throw new ApiError(401, "User not found.");
//   };

//   req.user = user;
//   next();
// });

// export default isLoggedIn;


import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import permissionMap from "../../config/permissionMap.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing.");
  };

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User
    .findById(decoded.id)
    .populate("permissions")
    .select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  };

  if (user.role == "admin") {
    req.user = user;
    return next();
  };

  const key = `${req.method} ${req.baseUrl}${req.route.path}`;
  const permission = permissionMap[key];

  if (permission) {
    const allowed = user?.permissions?.permissions?.[permission.module]?.[permission.action];
    if (!allowed) {
      throw new ApiError(403, "You don't have permission to perform this action.");
    };
  };

  req.user = user;
  next();
});

export default isLoggedIn;

