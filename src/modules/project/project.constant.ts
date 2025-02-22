import { TProjectStatus, TProjectType } from "./project.interface";

export const ProjectTypes: TProjectType[] = [
  "frontend",
  "backend",
  "full-stack",
];
export const ProjectStatus: TProjectStatus[] = [
  "active",
  "completed",
  "archived",
];

export const SearchableFields = ["title", "brief", "description"];
export const DefaultFields = [
  "title",
  "brief",
  "slug",
  "cover",
  "type",
  "frontend",
  "backend",
  "status",
];

export const PROJECT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  ARCHIVED: "archived",
};
