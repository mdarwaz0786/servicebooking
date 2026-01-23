import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
    required: [true, "Category is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  tags: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: false,
    trim: true,
  },
  fullDescription: {
    type: String,
    required: false,
  },
  frontImage: {
    type: String,
    required: false,
  },
  frontImageAlt: {
    type: String,
    default: null,
  },
  detailImage: {
    type: String,
    required: false,
  },
  detailImageAlt: {
    type: String,
    default: null,
  },
  meta: {
    title: {
      type: String,
      trim: true,
      default: null
    },
    keywords: {
      type: String,
      trim: true,
      default: null
    },
    slug: {
      type: String,
      default: null
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    author: {
      type: String,
      trim: true,
      default: null
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    canonicalTag: {
      type: String,
      trim: true,
      default: null
    },
  },
  publishState: {
    type: String,
    enum: ["draft", "published", "scheduled"],
    default: "draft",
  },
  publishDate: {
    type: Date,
  },
  publishTime: {
    type: String,
  },
  author: {
    type: String,
  },
  isComment: {
    type: Boolean,
    default: true,
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

blogSchema.pre("save", function (next) {
  if (!this.meta) this.meta = {};

  if (!this.meta.title || this.meta.title.trim() === "") {
    this.meta.title = this.title;
  };

  next();
});

blogSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (!update.meta) update.meta = {};

  if (update.meta && (!update.meta.title || update.meta.title.trim() === "")) {
    if (update.title) {
      update.meta.title = update.title;
    };
  };

  if (update.$set) {
    if (
      update.$set.meta &&
      (!update.$set.meta.title || update.$set.meta.title.trim() === "")
    ) {
      if (update.$set.title) {
        update.$set.meta.title = update.$set.title;
      };
    };
  };

  next();
});

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
