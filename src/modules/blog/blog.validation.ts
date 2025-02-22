import mongoose from "mongoose";
import { z } from "zod";
import { BlogContentType, BlogStatus } from "./blog.constant";

const author = z.object({
  name: z.string({
    invalid_type_error: "Author name must be string",
    required_error: "Author name is required",
  }),
  email: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    })
    .email(),
});

const create = z.object({
  body: z
    .object({
      title: z.string({
        invalid_type_error: "Title must be string",
        required_error: "Title is required",
      }),
      content: z.string({
        invalid_type_error: "Content must be string",
        required_error: "Content is required",
      }),
      brief: z.string({
        invalid_type_error: "Brief must be string",
        required_error: "Brief is required",
      }),
      cover: z.string({
        invalid_type_error: "Cover must be string",
        required_error: "Cover is required",
      }),
      author: author,
      contentType: z.enum([...BlogContentType] as [string, ...string[]]),
      tags: z.array(z.string(), {
        required_error: "Tags is required",
        invalid_type_error: "Tags must be an array of string",
      }),
      category: z
        .string({
          invalid_type_error: "Category ID must be string",
          required_error: "Category ID is required",
        })
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: "Invalid Category ID",
        }),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "Title must be string",
          required_error: "Title is required",
        })
        .optional(),
      content: z
        .string({
          invalid_type_error: "Content must be string",
          required_error: "Content is required",
        })
        .optional(),
      brief: z
        .string({
          invalid_type_error: "Brief must be string",
          required_error: "Brief is required",
        })
        .optional(),
      cover: z
        .string({
          invalid_type_error: "Cover must be string",
          required_error: "Cover is required",
        })
        .optional(),
      author: author.optional(),
      contentType: z
        .enum([...BlogContentType] as [string, ...string[]])
        .optional(),
      tags: z
        .array(z.string(), {
          required_error: "Tags is required",
          invalid_type_error: "Tags must be string",
        })
        .optional(),
      status: z.enum([...BlogStatus] as [string, ...string[]]).optional(),
      category: z
        .string({
          invalid_type_error: "Category ID must be string",
          required_error: "Category ID is required",
        })
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: "Invalid Category ID",
        })
        .optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
