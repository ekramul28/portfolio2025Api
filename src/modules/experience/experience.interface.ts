import { Document } from "mongoose";

export type TRoleType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Freelancer"
  | "Intern";

export type TJobType = "Remote" | "Onsite";

export interface IJobLocation {
  city: string;
  country: string;
}

export interface IJobLink {
  deploymentLink?: string;
  github?: string;
}

export interface IExperience extends Document {
  jobTitle: string;
  companyName: string;
  location: IJobLocation;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  description: string;
  skillsDeveloped: string[];
  links: IJobLink[];
  roleType: TRoleType;
  jobType: TJobType;
}
