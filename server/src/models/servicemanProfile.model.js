import mongoose from "mongoose";

const serviceManProfileSchema = new mongoose.Schema({
  servicemanId: {
    type: String,
    trim: true,
  },
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
  subCategoryIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "SubCategory",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
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
  monthOfExperience: {
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
    required: false,
    trim: true,
  },
  referenceMobile1: {
    type: String,
    required: false,
    trim: true,
  },
  referenceName2: {
    type: String,
    required: false,
    trim: true,
  },
  referenceMobile2: {
    type: String,
    required: false,
    trim: true,
  },
  profileStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Approved",
  },
  remarks: {
    type: String,
    trim: true,
  },
  canUpdate: {
    type: Number,
    enum: [1, 0],
    default: 1,
  },
  zones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone"
  }],
  status: {
    type: Boolean,
    default: true,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
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

serviceManProfileSchema.virtual("subCategories", {
  ref: "SubCategory",
  localField: "subCategoryIds",
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


serviceManProfileSchema.virtual("trainingScheduleSubmit", {
  ref: "TrainingScheduleSubmit",
  localField: "userId",
  foreignField: "providerId",
  justOne: true,
  options: {
    sort: {
      createdAt: -1,  // Descending order (latest first)
      // OR updatedAt: -1 // Agar aapko updatedAt ke basis par sort karna hai
    }
  },
});

serviceManProfileSchema.pre("save", async function (next) {
  if (this.servicemanId) return next();
  try {
    const lastRecord = await this.constructor
      .findOne({ servicemanId: { $regex: /^GI\d+$/ } })
      .sort({ createdAt: -1 })
      .select("servicemanId")
      .lean();

    let nextNumber = 101;

    if (lastRecord?.servicemanId) {
      const numericPart = parseInt(
        lastRecord.servicemanId.replace("GI", ""),
        10
      );

      if (!isNaN(numericPart)) {
        nextNumber = numericPart + 1;
      };
    };

    this.servicemanId = `GI${nextNumber}`;
    next();
  } catch (error) {
    next(error);
  };
});

const ServiceManProfileModel = mongoose.model("ServiceManProfile", serviceManProfileSchema);

export default ServiceManProfileModel;
