// server/src/utils/responseUtils.ts
import { ApiResponse, ApiErrorResponse } from '@fullstack/common'; // Assuming this is the correct path alias

/**
 * Creates a standardized API response object for the server.
 *
 * @param success - Whether the API call was successful.
 * @param data - The data to be returned (if successful).
 * @param error - An error object (if not successful).
 * @returns ApiResponse<T>
 */
export function createApiResponse<T>(
  success: boolean,
  data?: T,
  error?: ApiErrorResponse
): ApiResponse<T> {
  if (success) {
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      data: data, // Or explicitly undefined
      error: error || {
        name: 'UnknownServerError', // More server-specific default
        message: 'An unexpected error occurred on the server.',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
