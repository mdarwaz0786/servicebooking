import mongoose from "mongoose";

const rateCardSchema = new mongoose.Schema({
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  }],
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
      },
    }],
  }],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("RateCard", rateCardSchema);
