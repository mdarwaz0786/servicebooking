import mongoose from "mongoose";

const appSchemaSchema = new mongoose.Schema({
  serviceman: {
    android: {
      type: String,
      default: null,
    },
    ios: {
      type: String,
      default: null,
    },
    androidVersion: {
      type: String,
      default: null,
    },
    iosVersion: {
      type: String,
      default: null,
    },
  },
  user: {
    android: {
      type: String,
      default: null,
    },
    ios: {
      type: String,
      default: null,
    },
    androidVersion: {
      type: String,
      default: null,
    },
    iosVersion: {
      type: String,
      default: null,
    },
  },
  status: {
    type: Boolean,
    default: true,
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
}, { timestamps: true });

const AppModel = mongoose.model("App", appSchemaSchema);

export default AppModel;
