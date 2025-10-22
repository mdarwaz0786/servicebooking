import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
  {
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
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true });

const ContactEnquiryModel = mongoose.model("ContactEnquiry", contactEnquirySchema);

export default ContactEnquiryModel;
