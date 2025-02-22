import { z } from "zod";

const login = z.object({
  body: z
    .object({
      email: z
        .string({
          invalid_type_error: "Email must be string",
          required_error: "Email is required",
        })
        .email("Provide a valid email address"),
      password: z.string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
      }),
    })
    .strict(),
});

const register = z.object({
  body: z
    .object({
      email: z
        .string({
          invalid_type_error: "Email must be string",
          required_error: "Email is required",
        })
        .email("Provide a valid email address"),
      password: z.string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
      }),
      name: z.string({
        invalid_type_error: "Name must be string",
        required_error: "Name is required",
      }),
    })
    .strict(),
});

export default {
  login,
  register,
};
