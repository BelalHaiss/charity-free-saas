import axios, { AxiosError } from "axios";
import { CustomException } from "@main/nest/shared/exception/CustomException";

export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error);
};

export const isAPIError = (error: unknown): error is CustomException => {
  return (
    typeof error === "object" &&
    error !== null &&
    typeof (error as CustomException).message === "string" &&
    typeof (error as CustomException).statusCode === "number"
  );
};

export const getServerErrorMessage = (error: unknown): string | undefined => {
  if (isAxiosError(error)) {
    if (error.response) {
      if (isAPIError(error.response.data)) {
        return error.response.data.message;
      }
    }
  }
};
