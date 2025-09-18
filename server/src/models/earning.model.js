import mongoose from "mongoose";

const earningSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    unique: true,
  },
  earningHour1: {
    type: Number,
    required: true,
  },
  earningPrice1: {
    type: Number,
    required: true,
  },
  earningHour2: {
    type: Number,
    required: false,
  },
  earningPrice2: {
    type: Number,
    required: false,
  },
  earningHour3: {
    type: Number,
    required: false,
  },
  earningPrice3: {
    type: Number,
    required: false,
  },
  earningHour4: {
    type: Number,
    required: false,
  },
  earningPrice4: {
    type: Number,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
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

earningSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

const EarningModel = mongoose.model("Earning", earningSchema);

export default EarningModel;
