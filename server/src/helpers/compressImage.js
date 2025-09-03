import sharp from "sharp";
import path from "path";
import fs from "fs";
import ApiError from "./apiError.js";

const compressImage = async (
  buffer,
  folder = "common",
  maxSizeKB = 100,
  quality = 80,
  minQuality = 50,
  width = 1200,
  minWidth = 200,
) => {
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  };

  const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const finalPath = path.join(uploadDir, `${baseName}.jpeg`);

  try {
    const baseImage = sharp(buffer);
    const metadata = await baseImage.metadata();
    const aspectRatio = metadata?.width && metadata?.height ? metadata.width / metadata.height : 1;

    let currentQuality = quality;
    let currentWidth = width;
    let height = Math.round(currentWidth / aspectRatio);
    let resizedBuffer;

    while (true) {
      resizedBuffer = await baseImage
        .clone()
        .resize({ width: currentWidth, height, fit: "inside" })
        .jpeg({ quality: currentQuality, mozjpeg: true })
        .toBuffer();

      const bufferSizeKB = resizedBuffer.length / 1024;

      if (bufferSizeKB <= maxSizeKB) {
        fs.writeFileSync(finalPath, resizedBuffer);
        return `uploads/${folder}/${baseName}.jpeg`;
      };

      if (currentQuality > minQuality) {
        currentQuality -= 10;
      } else if (currentWidth > minWidth) {
        currentWidth = Math.floor(currentWidth * 0.85);
        height = Math.floor(currentWidth / aspectRatio);
      } else {
        break;
      };
    };

    throw new ApiError(422, "Unable to compress image under desired size. Try uploading a smaller image.");
  } catch (error) {
    throw new ApiError(400, "Image is corrupted or in unsupported format.");
  };
};

export default compressImage;
