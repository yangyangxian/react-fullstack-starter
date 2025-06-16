// server/src/utils/responseUtils.ts
import { ApiResponse, ApiErrorResponse } from '@fullstack/common'; // Assuming this is the correct path alias

/**
 * Creates a standardized API response object for the server.
 *
 * @param data - The data to be returned (if successful).
 * @param error - An error object (if not successful).
 * @returns ApiResponse<T>
 */
export function createApiResponse<T>(
  data?: T,
  error?: ApiErrorResponse
): ApiResponse<T> {
  if (error) {
    return {
      data: data,
      error: error,
    };
  } else {
    return {
      data: data,
    };
  }
}
