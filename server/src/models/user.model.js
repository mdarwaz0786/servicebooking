import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
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
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "subadmin", "user", "provider","serviceman"],
        message: "Role must be either admin or subadmin or user or provider",
      },
      default: "user",
    },
    profileImage: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    }
  },
  { timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true } },
);


userSchema.virtual("profile", {
  ref: "ServiceManProfile",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});


userSchema.virtual("kyc", {
  ref: "KYC",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});




userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
