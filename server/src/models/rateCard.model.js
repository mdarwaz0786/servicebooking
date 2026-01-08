import mongoose from "mongoose";

const rateCardSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product is required"],
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: [true, "Varinat is required"],
  },
  rateGroups: [{
    title: {
      type: String,
      trim: true,
    },
    rates: [{
      description: {
        type: String,
        trim: true,
      },
      serviceCharge: {
        price: {
          type: String,
          trim: true,
        },
        labourCharge: {
          type: String,
          trim: true,
        },
        discountPrice: {
          type: String,
          trim: true,
        },
      },
    }],
  }],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

rateCardSchema.pre("save", async function (next) {
  const doc = this;

  const titles = doc.rateGroups.map(g => g.title?.trim().toLowerCase());
  const uniqueTitles = new Set(titles);

  if (uniqueTitles.size !== titles.length) {
    return next(new Error("Duplicate rate group titles in this rate card"));
  }

  const existing = await mongoose.model("RateCard").findOne({
    category: doc.category,
    subCategory: doc.subCategory,
    "rateGroups.title": { $in: titles },
    _id: { $ne: doc._id }
  });

  if (existing) {
    return next(
      new Error("Rate group title already exists for this product and variant")
    );
  }

  next();
});

export default mongoose.model("RateCard", rateCardSchema);
