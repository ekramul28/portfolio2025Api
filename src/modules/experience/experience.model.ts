import { model, Schema } from "mongoose";
import { JobTypes, RoleTypes } from "./experience.constant";
import { IExperience, IJobLink, IJobLocation } from "./experience.interface";

const jobLinkSchema = new Schema<IJobLink>({
  deploymentLink: {
    type: String,
    required: [true, "Link is required"],
    trim: true,
  },
  github: {
    type: String,
    default: null,
    trim: true,
  },
});

const jobLocationSchema = new Schema<IJobLocation>(
  {
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
  },
  { _id: false },
);

const experienceSchema = new Schema<IExperience>({
  jobTitle: {
    type: String,
    required: [true, "Job Title is required"],
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, "Company is required"],
    trim: true,
  },
  location: {
    type: jobLocationSchema,
    required: [true, "Location is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  isCurrentJob: {
    type: Boolean,
    default: false,
    required: [true, "Is current job is required"],
  },
  skillsDeveloped: {
    type: [String],
    trim: true,
  },
  jobType: {
    type: String,
    enum: {
      values: JobTypes,
      message: "{VALUE} is invalid job type",
    },
    required: [true, "Job type is required"],
  },
  roleType: {
    type: String,
    enum: {
      values: RoleTypes,
      message: "{VALUE} is invalid role type",
    },
    required: [true, "Role type is required"],
  },
  links: {
    type: [jobLinkSchema],
  },
});

const Experience = model<IExperience>("Experience", experienceSchema);
export default Experience;
