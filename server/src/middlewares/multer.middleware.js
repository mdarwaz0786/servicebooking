import multer from "multer";
import ApiError from "../helpers/apiError.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf"
    ) {
      return cb(null, true);
    };

    cb(new ApiError(400, "Only images, videos, and PDFs are allowed"), false);
  },
});

export default upload;
