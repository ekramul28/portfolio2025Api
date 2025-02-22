import {
  TErrorSources,
  TGenericErrorResponse,
} from "@/interface/error.interface";
import mongoose from "mongoose";

const handleMongooseCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources: errorMessages,
  };
};

export default handleMongooseCastError;
