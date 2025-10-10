import mongoose from "mongoose";

const requirementFromCustomerSchema = new mongoose.Schema({
  mainTitle: {
    type: String,
    trim: true,
  },
  requirements: [
    {
      icon: { type: String, trim: true },
      name: { type: String, trim: true },
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("RequirementFromCustomer", requirementFromCustomerSchema);
