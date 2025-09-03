import multer from "multer";
import ApiError from "../helpers/apiError.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    };
    cb(new ApiError(400, "Only image files are allowed"), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
