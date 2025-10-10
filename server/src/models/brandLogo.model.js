import mongoose from "mongoose";

const brandLogoSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  icons: [
    {
      type: String,
      trim: true,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("BrandLogo", brandLogoSchema);
