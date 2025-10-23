import ApiError from "../helpers/apiError.js";

const SIZE_LIMITS = {
  image: 100 * 1024 * 1024,   // 100MB
  video: 100 * 1024 * 1024,   // 100MB
  pdf: 100 * 1024 * 1024,     // 100MB
};

const checkSize = (file) => {
  const { mimetype, size, originalname } = file;

  if (mimetype.startsWith("image/") && size > SIZE_LIMITS.image) {
    return `${originalname} exceeds 100MB image size limit.`;
  };

  if (mimetype.startsWith("video/") && size > SIZE_LIMITS.video) {
    return `${originalname} exceeds 100MB video size limit.`;
  };

  if (mimetype === "application/pdf" && size > SIZE_LIMITS.pdf) {
    return `${originalname} exceeds 100MB PDF size limit.`;
  };

  return null;
};

const validateFileSize = (req, res, next) => {
  // Single file (upload.single)
  if (req.file) {
    const error = checkSize(req.file);
    if (error) return next(new ApiError(400, error));
    return next();
  };

  // Multiple files (upload.array and upload.fields)
  if (req.files) {
    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        const error = checkSize(file);
        if (error) return next(new ApiError(400, error));
      };
    } else {
      for (const field in req.files) {
        for (const file of req.files[field]) {
          const error = checkSize(file);
          if (error) return next(new ApiError(400, error));
        };
      };
    };
  };

  next();
};

export default validateFileSize;
