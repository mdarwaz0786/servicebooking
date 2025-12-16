import mongoose from "mongoose";

const serviceManProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  categoryIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
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
  mobile: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  experienceLevel: {
    type: String,
    enum: ["Fresher", "Experience"],
    required: true,
  },
  companyName: {
    type: String,
    required: function () {
      return this.workingType === "Experience";
    },
    trim: true,
  },
  yearOfExperience: {
    type: Number,
    required: function () {
      return this.workingType === "Experience";
    },
    min: 0,
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
  profileStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  remarks: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

serviceManProfileSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

serviceManProfileSchema.virtual("categories", {
  ref: "Category",
  localField: "categoryIds",
  foreignField: "_id",
  justOne: false,
});

serviceManProfileSchema.virtual("kyc", {
  ref: "KYC",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
  options: { 
    sort: { 
      createdAt: -1,  // Descending order (latest first)
      // OR updatedAt: -1 // Agar aapko updatedAt ke basis par sort karna hai
    } 
  },
});


serviceManProfileSchema.virtual("training", {
  ref: "TrainingScheduleSubmit",
  localField: "_id",
  foreignField: "providerId",
  justOne: true,
});

const ServiceManProfileModel = mongoose.model("ServiceManProfile", serviceManProfileSchema);

export default ServiceManProfileModel;
