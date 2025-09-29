import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import ApiError from "./apiError.js";

// Set the path to FFmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

const compressVideo = async (buffer, folder = "videos", crf = 28, preset = "veryfast") => {
  return new Promise((resolve, reject) => {
    try {
      const uploadDir = path.join(process.cwd(), "uploads", folder);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.mp4`;
      const finalPath = path.join(uploadDir, baseName);
      const tempPath = path.join(uploadDir, `temp-${baseName}`);

      // Save the buffer temporarily
      fs.writeFileSync(tempPath, buffer);

      // Compress video using FFmpeg
      ffmpeg(tempPath)
        .outputOptions([
          "-vcodec libx264",   // video codec
          `-crf ${crf}`,       // quality 0–51 (lower = better)
          `-preset ${preset}`, // compression speed
          "-acodec aac",       // audio codec
          "-b:a 128k",         // audio bitrate
        ])
        .size("1280x?")       // resize width 1280px, keep aspect ratio
        .on("end", () => {
          fs.unlinkSync(tempPath); // remove temp file
          resolve(`uploads/${folder}/${baseName}`);
        })
        .on("error", (err) => {
          fs.unlinkSync(tempPath);
          reject(new ApiError(500, "Video compression failed: " + err.message));
        })
        .save(finalPath);
    } catch (err) {
      reject(new ApiError(500, "Video compression failed: " + err.message));
    };
  });
};

export default compressVideo;
