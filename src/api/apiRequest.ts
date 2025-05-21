import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

export const apiRequest = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T | null> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: unknown) {
    let message = "Unknown error";

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      message = (error as { message: string }).message;
    }

    if (error instanceof AxiosError) {
      const response = error.response;
      if (
        response &&
        response.data &&
        typeof response.data.message === "string"
      ) {
        message = response.data.message;
      }
    }

    console.error("API request error:", message);
  }

  return null;
};
