import { PaginatedQueryBuilder, SingleDocQueryBuilder } from "@/builders";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import {
  DefaultFields,
  PROJECT_STATUS,
  SearchableFields,
} from "./project.constant";
import { IProject } from "./project.interface";
import Project from "./project.model";

const create = async (payload: IProject) => {
  payload.slug = await Project.generateSlug(payload.title);
  return Project.create({ ...payload });
};

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Project.find(),
    query,
    "/api/v1/projects",
  );

  const result = await queryBuilder
    .filter()
    .search(SearchableFields)
    .sort()
    .paginate()
    .execute();

  return result;
};

const getOne = async (slug: string, query: Record<string, unknown>) => {
  const project = await new SingleDocQueryBuilder(Project, { slug }, query)
    .selectFields(DefaultFields)
    .execute();

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return project;
};

const updateOne = async (id: string, payload: IProject) => {
  payload.slug = payload.title && (await Project.generateSlug(payload.title));
  const { features, ...restOfPayload } = payload;

  const updatedBlog = await Project.findByIdAndUpdate(
    id,
    {
      ...restOfPayload,
      ...(features && {
        $addToSet: { features: { $each: features } },
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return updatedBlog;
};

const deleteOne = async (id: string) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true, status: PROJECT_STATUS.ARCHIVED },
    { new: true, runValidators: true },
  );
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  return project;
};

export default {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
