import { z } from "zod";

const create = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: "Name must be string",
        required_error: "Name is required",
      }),
      email: z
        .string({
          invalid_type_error: "Email must be string",
          required_error: "Email is required",
        })
        .email(),
      password: z.string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
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
      email: z
        .string({
          invalid_type_error: "Email must be string",
          required_error: "Email is required",
        })
        .email()
        .optional(),
      password: z
        .string({
          invalid_type_error: "Password must be string",
          required_error: "Password is required",
        })
        .optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
