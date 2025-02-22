import { z } from "zod";

const create = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: "Name must be string",
        required_error: "Name is required",
      }),
      brief: z.string({
        invalid_type_error: "Brief must be string",
        required_error: "Brief is required",
      }),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Name must be string",
          required_error: "Name is required",
        })
        .optional(),
      brief: z
        .string({
          invalid_type_error: "Brief must be string",
          required_error: "Brief is required",
        })
        .optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
