import { PaginatedQueryBuilder } from "@/builders";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import { IExperience } from "./experience.interface";
import Experience from "./experience.model";

const create = async (payload: IExperience) => {
  return Experience.create({ ...payload });
};

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Experience.find(),
    query,
    "/api/v1/experiences",
  );

  const result = await queryBuilder
    .filter()
    .search()
    .sort()
    .selectFields()
    .paginate()
    .execute();

  return result;
};

const updateOne = async (id: string, payload: IExperience) => {
  const { skillsDeveloped, ...restOfPayload } = payload;

  const updatedBlog = await Experience.findByIdAndUpdate(
    id,
    {
      ...restOfPayload,
      ...(skillsDeveloped && {
        $addToSet: { skillsDeveloped: { $each: skillsDeveloped } },
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found");
  }

  return updatedBlog;
};

export default {
  create,
  getAll,
  updateOne,
};
