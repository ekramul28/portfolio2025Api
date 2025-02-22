import { PaginatedQueryBuilder } from "@/builders";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import { SearchableFields } from "./category.constant";
import { ICategory } from "./category.interface";
import Category from "./category.model";

const create = async (payload: ICategory) => {
  return Category.create({ ...payload });
};

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Category.find(),
    query,
    "/api/v1/categories",
  );

  const result = await queryBuilder
    .filter() // Apply filter based on query
    .search(SearchableFields) // Search in specified fields
    .sort() // Apply sorting
    .selectFields() // Select specified fields
    .paginate() // Apply pagination
    .execute(); // Execute the query and get results

  return result;
};

const updateOne = async (id: string, payload: ICategory) => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return category;
};

const deleteOne = async (id: string) => {
  const category = await Category.findByIdAndDelete(id, { new: true });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return;
};

export default {
  create,
  getAll,
  updateOne,
  deleteOne,
};
