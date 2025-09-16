import mongoose from "mongoose";

const serviceManProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }],
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  workingHistory: {
    type: {
      type: String,
      enum: ["Fresher", "Experience"],
      required: true,
    },
    company: {
      type: String,
      required: function () {
        return this.workingHistory?.type === "Experience";
      },
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: function () {
        return this.workingHistory?.type === "Experience";
      },
      min: 0,
    },
  },
  permanentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  currentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  referenceName1: {
    type: String,
    required: true,
    trim: true,
  },
  referenceMobile1: {
    type: String,
    required: true,
    trim: true,
  },
  referenceName2: {
    type: String,
    required: true,
    trim: true,
  },
  referenceMobile2: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

const ServiceManProfileModel = mongoose.model("ServiceManProfile", serviceManProfileSchema);

export default ServiceManProfileModel;
