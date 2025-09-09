import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email address",
      },
    },
    mobile: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      required: [true, "Mobile number is required"],
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Mobile number must be exactly 10 digits",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user", "provider"],
        message: "Role must be either admin or user or provider",
      },
      default: "user",
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
