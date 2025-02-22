import { PaginatedQueryBuilder } from "@/builders";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import { DefaultFields, SearchableFields } from "./skill.constant";
import { ISkill } from "./skill.interface";
import Skill from "./skill.model";

const create = async (payload: ISkill) => {
  return Skill.create({ ...payload });
};

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Skill.find(),
    query,
    "/api/v1/skills",
  );

  const result = await queryBuilder
    .filter()
    .search(SearchableFields)
    .sort()
    .selectFields(DefaultFields)
    .paginate()
    .execute();

  return result;
};

const updateOne = async (id: string, payload: ISkill) => {
  const skill = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found");
  }
  return skill;
};

export default {
  create,
  getAll,
  updateOne,
};
