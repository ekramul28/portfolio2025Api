import {
  TErrorSources,
  TGenericErrorResponse,
} from "@/interface/error.interface";
import { ZodError } from "zod";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorMessages: TErrorSources = error.issues.map((issue) => {
    return {
      path: issue.path.slice(1).join(".") || issue.path[0],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources: errorMessages,
  };
};

export default handleZodError;
