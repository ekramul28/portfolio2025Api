import { PaginatedQueryBuilder, SingleDocQueryBuilder } from "@/builders";
import { AppError } from "@/errors";
import httpStatus from "http-status";
import Category from "../category/category.model";
import { BLOG_STATUS, DefaultFields, SearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

const create = async (payload: IBlog) => {
  payload.slug = await Blog.generateSlug(payload.title);
  payload.status = "published";

  const category = await Category.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  return (await Blog.create({ ...payload, category: category._id })).populate(
    "category",
  );
};

const getAll = async (query: Record<string, unknown>) => {
  const queryBuilder = new PaginatedQueryBuilder(
    Blog.find(),
    query,
    "/api/v1/blogs",
  );

  const result = await queryBuilder
    .filter() // Apply filter based on query
    .search(SearchableFields) // Search in specified fields
    .sort() // Apply sorting
    .selectFields(DefaultFields) // Select specified fields
    .populateFields(["category"]) // Dynamically populate fields
    .paginate() // Apply pagination
    .execute(); // Execute the query and get results

  return result;
};

/* const getOne = async (id: string, query: Record<string, unknown>) => {
  // Determine fields to select based on 'fields' or default to minimal fields
  const defaultFields = "title brief slug cover";
  const fieldsToSelect = query.expand
    ? "" // If 'expand' is true, select all fields
    : query.fields
      ? (query.fields as string).split(",").join(" ") // Use specified fields if provided
      : defaultFields; // Default fields if no 'fields' or 'expand'

  // Check if 'category' is included in the fields and populate accordingly
  const populateOptions =
    query.expand ||
    (query.fields && (query.fields as string).includes("category"))
      ? "category"
      : "";

  // Build the query with the specified fields and conditional population
  const blogQuery = Blog.findById(id).select(fieldsToSelect);
  if (populateOptions) {
    blogQuery.populate(populateOptions);
  }

  const blog = await blogQuery;

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
}; */

const getOne = async (slug: string, query: Record<string, unknown>) => {
  const blog = await new SingleDocQueryBuilder(Blog, { slug: slug }, query)
    .selectFields(DefaultFields) // Set the fields to select
    .populate(["category"]) // Populate the category field if necessary
    .execute(); // Execute the query

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return blog;
};

const updateOne = async (id: string, payload: IBlog) => {
  const { tags, ...restOfPayload } = payload;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      ...restOfPayload,
      ...(tags && {
        $addToSet: { tags: { $each: tags } },
      }),
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  return updatedBlog;
};

const deleteOne = async (id: string) => {
  const blog = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true, status: BLOG_STATUS.DELETED },
    { new: true, runValidators: true },
  );
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  return blog;
};

export default {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
