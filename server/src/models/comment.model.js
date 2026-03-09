import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Content ID is required"],
    },
    contentType: {
      type: String,
      enum: ["Blog", "Service", "Post"],
      required: [true, "Content type is required"],
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      maxlength: 1000,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

commentSchema.index({ contentId: 1, contentType: 1 });
commentSchema.index({ userId: 1 });
commentSchema.index({ parentId: 1 });

commentSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

commentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentId",
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;