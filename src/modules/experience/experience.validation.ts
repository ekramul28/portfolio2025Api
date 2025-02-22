import { string, z } from "zod";
import { JobTypes, RoleTypes } from "./experience.constant";

const jobLink = z.object({
  deploymentLink: z.string({
    invalid_type_error: "Deployment link must be a string",
    required_error: "Deployment link is required",
  }),
  github: string({
    invalid_type_error: "GitHub link must be a string",
    required_error: "GitHub link is required",
  })
    .nullable()
    .optional(),
});

const jobLocation = z.object(
  {
    city: z.string({
      invalid_type_error: "City must be a string",
      required_error: "City is required",
    }),
    country: z.string({
      invalid_type_error: "Country must be a string",
      required_error: "Country is required",
    }),
  },
  { required_error: "Location is required" },
);

const create = z.object({
  body: z
    .object({
      jobTitle: z.string({
        invalid_type_error: "Job title must be a string",
        required_error: "Job title is required",
      }),
      companyName: z.string({
        invalid_type_error: "Company name must be a string",
        required_error: "Company name is required",
      }),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }),
      startDate: z
        .string({
          invalid_type_error:
            "Start date must be a string in the format 'YYYY-MM-DD'",
          required_error: "Start date is required",
        })
        .datetime(),
      endDate: z
        .string({
          invalid_type_error:
            "End date must be a string in the format 'YYYY-MM-DD'",
          required_error: "End date is required",
        })
        .datetime()
        .nullable()
        .optional(),
      isCurrentJob: z.boolean({
        invalid_type_error: "Is current job must be a boolean",
        required_error: "Is current job is required",
      }),
      skillsDeveloped: z
        .array(z.string(), {
          required_error: "Skills developed is required",
          invalid_type_error: "Skills developed must be an array of strings",
        })
        .optional(),
      links: z.array(jobLink, {
        required_error: "Links is required",
        invalid_type_error: "Links must be an array of Job Link object",
      }),
      location: jobLocation,
      roleType: z.enum([...RoleTypes] as [string, ...string[]], {
        required_error: "Job Role is required",
      }),
      jobType: z.enum([...JobTypes] as [string, ...string[]], {
        required_error: "Job Type is required",
      }),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      jobTitle: z
        .string({
          invalid_type_error: "Job title must be a string",
          required_error: "Job title is required",
        })
        .optional(),
      companyName: z
        .string({
          invalid_type_error: "Company name must be a string",
          required_error: "Company name is required",
        })
        .optional(),
      description: z
        .string({
          invalid_type_error: "Description must be a string",
          required_error: "Description is required",
        })
        .optional(),
      startDate: z
        .string({
          invalid_type_error:
            "Start date must be a string in the format 'YYYY-MM-DD'",
          required_error: "Start date is required",
        })
        .date()
        .optional(),
      endDate: z
        .string({
          invalid_type_error:
            "End date must be a string in the format 'YYYY-MM-DD'",
          required_error: "End date is required",
        })
        .date()
        .optional(),
      isCurrentJob: z
        .boolean({
          invalid_type_error: "Is current job must be a boolean",
          required_error: "Is current job is required",
        })
        .optional(),
      skillsDeveloped: z
        .array(z.string(), {
          required_error: "Skills developed is required",
          invalid_type_error: "Skills developed must be an array of strings",
        })
        .optional(),
      links: z
        .array(jobLink, {
          required_error: "Links is required",
          invalid_type_error: "Links must be an array of Job Link object",
        })
        .optional(),
      location: jobLocation.optional(),
      roleType: z.enum([...RoleTypes] as [string, ...string[]]).optional(),
      jobType: z.enum([...JobTypes] as [string, ...string[]]).optional(),
    })
    .strict(),
});

export default {
  create,
  update,
};
