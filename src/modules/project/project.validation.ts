import { z } from "zod";
import { ProjectTypes } from "./project.constant";

const techStack = z.object({
  technologies: z.array(z.string(), {
    required_error: "Technologies is required",
    invalid_type_error: "Technologies must be an array of string",
  }),
  deploymentLink: z.string({
    invalid_type_error: "Deployment link must be a string",
    required_error: "Deployment link is required",
  }),
  github: z.string({
    invalid_type_error: "GitHub link must be a string",
    required_error: "GitHub link is required",
  }),
});

const create = z.object({
  body: z
    .object({
      title: z.string({
        invalid_type_error: "Title must be a string",
        required_error: "Title is required",
      }),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }),
      brief: z.string({
        invalid_type_error: "Brief must be a string",
        required_error: "Brief is required",
      }),
      cover: z.string({
        invalid_type_error: "Cover must be a string",
        required_error: "Cover is required",
      }),
      features: z.array(z.string(), {
        required_error: "Features is required",
        invalid_type_error: "Features must be an array of string",
      }),
      images: z
        .array(z.string(), {
          required_error: "Images is required",
          invalid_type_error: "Images must be an array of string",
        })
        .max(6, "Images maximum allowed 6"),
      type: z.enum([...ProjectTypes] as [string, ...string[]]),
      frontend: techStack.optional(),
      backend: techStack.optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "Title must be a string",
          required_error: "Title is required",
        })
        .optional(),
      description: z
        .string({
          invalid_type_error: "Description must be a string",
          required_error: "Description is required",
        })
        .optional(),
      brief: z
        .string({
          invalid_type_error: "Brief must be a string",
          required_error: "Brief is required",
        })
        .optional(),
      cover: z
        .string({
          invalid_type_error: "Cover must be a string",
          required_error: "Cover is required",
        })
        .optional(),
      features: z
        .array(z.string(), {
          required_error: "Features is required",
          invalid_type_error: "Features must be an array of string",
        })
        .optional(),
      images: z
        .array(z.string(), {
          required_error: "Images is required",
          invalid_type_error: "Images must be an array of string",
        })
        .max(6, "Images maximum allowed 6")
        .optional(),
      type: z.enum([...ProjectTypes] as [string, ...string[]]).optional(),
      frontend: techStack.optional(),
      backend: techStack.optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
