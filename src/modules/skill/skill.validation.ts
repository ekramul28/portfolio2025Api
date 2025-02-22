import { z } from "zod";

const create = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      }),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }),
      icon: z
        .string({
          invalid_type_error: "Icon must be a string",
          required_error: "Icon is required",
        })
        .optional(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Name must be a string",
          required_error: "Name is required",
        })
        .optional(),
      description: z
        .string({
          invalid_type_error: "Description must be a string",
          required_error: "Description is required",
        })
        .optional(),
      icon: z
        .string({
          invalid_type_error: "Icon must be a string",
          required_error: "Icon is required",
        })
        .optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
