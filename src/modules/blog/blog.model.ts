import { model, Schema } from "mongoose";
import slugify from "slugify";
import { BlogContentType, BlogStatus } from "./blog.constant";
import { IBlog, IBlogAuthor, IBlogModel } from "./blog.interface";

const blogAuthorSchema = new Schema<IBlogAuthor>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
});

const blogSchema = new Schema<IBlog, IBlogModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    brief: {
      type: String,
      required: [true, "Brief is required"],
      trim: true,
    },
    cover: {
      type: String,
      required: [true, "Cover image is required"],
      trim: true,
    },
    contentType: {
      type: String,
      enum: {
        values: BlogContentType,
        message: "{VALUE} is invalid Content Type",
      },
      default: "string",
    },
    author: blogAuthorSchema,
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: {
        values: BlogStatus,
        message: "{VALUE} is invalid status",
      },
      default: "draft",
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// mongoose pre query middleware
blogSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre("findOneAndUpdate", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.pre("findOneAndDelete", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

blogSchema.statics.generateSlug = async function (title: string) {
  const baseSlug = await slugify(title, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@#$%^&\\]/g,
    replacement: "-",
  });

  let slug = baseSlug;
  let counter = 1;

  // Keep checking for existing slugs and increment the counter if needed
  while (await this.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

const Blog = model<IBlog, IBlogModel>("Blog", blogSchema);
export default Blog;
