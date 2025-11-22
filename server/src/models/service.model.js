import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
    maxlength: [150, "Service name must not exceed 150 characters"],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: Number,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  icon: {
    type: String,
    required: false,
    trim: true,
  },
  mrpPrice: {
    type: Number,
    required: false,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  taxablePrice: {
    type: Number,
    required: false,
  },
  timeTaking: {
    type: String,
    required: false,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [5000000, "Short description must not exceed 250 characters"],
  },
  fullDescription: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  subSubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
    required: false,
  },
  subSubSubCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubSubCategory",
    required: false,
  },
  repairingDiagnostic: {
    type: Boolean,
  },
  offerContent: {
    type: String,
  },
  maxBookingQuantity: {
    type: String,
  },
  creditPoint: {
    type: String,
  },
  transactionCharge: {
    type: String,
  },
  popupImage: {
    type: String,
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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

serviceSchema.index({ name: 1, categoryId: 1, subCategoryId: 1, subSubCategoryId: 1, subSubSubCategoryId: 1 }, { unique: true });

serviceSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

serviceSchema.virtual("subCategory", {
  ref: "SubCategory",
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true,
});

serviceSchema.virtual("subSubCategory", {
  ref: "SubSubCategory",
  localField: "subSubCategoryId",
  foreignField: "_id",
  justOne: true,
});

serviceSchema.virtual("subSubSubCategory", {
  ref: "SubSubSubCategory",
  localField: "subSubSubCategoryId",
  foreignField: "_id",
  justOne: true,
});

serviceSchema.virtual("serviceIncluded", {
  ref: "ServiceIncluded",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("requirementFromCustomer", {
  ref: "RequirementFromCustomer",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("whyChooseUs", {
  ref: "WhyChooseUs",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("expertTechnician", {
  ref: "ExpertTechnician",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("brandLogo", {
  ref: "BrandLogo",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("gIPromise", {
  ref: "GIPromise",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

serviceSchema.virtual("serviceFaq", {
  ref: "ServiceFaq",
  localField: "_id",
  foreignField: "services",
  justOne: true,
});

const ServiceModel = mongoose.model("Service", serviceSchema);

export default ServiceModel;
