import { model, Schema } from "mongoose";
import slugify from "slugify";
import { ProjectStatus, ProjectTypes } from "./project.constant";
import { IProject, IProjectModel, ITeckStack } from "./project.interface";

const techStackSchema = new Schema<ITeckStack>(
  {
    technologies: {
      type: [String],
      required: [true, "Technologies are required"],
    },
    deploymentLink: {
      type: String,
      required: [true, "Deployment link is required"],
    },
    github: {
      type: String,
      required: [true, "GitHub link is required"],
    },
  },
  { _id: false },
);

const projectSchema = new Schema<IProject, IProjectModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
      required: [true, "Features are required"],
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    type: {
      type: String,
      enum: {
        values: ProjectTypes,
        message: "{VALUE} is invalid project type",
      },
    },
    status: {
      type: String,
      enum: {
        values: ProjectStatus,
        message: "{VALUE} is invalid project status",
      },
      default: "active",
    },
    frontend: {
      type: techStackSchema,
      required: [true, "Frontend stack is required"],
    },
    backend: {
      type: techStackSchema,
      required: [true, "Backend stack is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

projectSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

projectSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

projectSchema.pre("findOneAndUpdate", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

projectSchema.pre("findOneAndDelete", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

projectSchema.statics.generateSlug = async function (title: string) {
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

const Project = model<IProject, IProjectModel>("Project", projectSchema);
export default Project;
