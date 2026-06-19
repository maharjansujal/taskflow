import { AxiosError } from "axios";

export function normalizeError(error: Error | null) {
  return error instanceof AxiosError
    ? (error.response?.data?.error ?? error.message)
    : error instanceof Error
      ? error.message
      : null;
}
