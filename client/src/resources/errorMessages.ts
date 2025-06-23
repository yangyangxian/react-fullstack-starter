import { ErrorCodes } from '@fullstack/common';

/**
 * Centralized error messages for each error code
 * This makes it easy to maintain consistent messaging and add i18n support in the future
 */
export const ERROR_MESSAGES: Record<ErrorCodes, string> = {
    [ErrorCodes.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorCodes.UNAUTHORIZED]: 'You are not authorized to access this resource.',
    [ErrorCodes.MISSING_CREDENTIALS]: 'Please provide your email and password.',
    [ErrorCodes.INVALID_CREDENTIALS]: 'Invalid email or password. Please try again.',
    [ErrorCodes.INVALID_TOKEN]: 'Your session has expired. Please log in again.',
    [ErrorCodes.INTERNAL_ERROR]: 'A server error occurred. Please try again later.',
    [ErrorCodes.DATABASE_CONNECTION_NOT_CONFIGURED]: 'Database configuration error. Please contact support.',
    [ErrorCodes.JWT_CONFIGURATION_ERROR]: 'Authentication system error. Please contact support.',
    [ErrorCodes.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection or server status.',
    [ErrorCodes.HTTP_ERROR]: 'A network error occurred. Please try again.',
    [ErrorCodes.NO_DATA]: 'No data received from the server. Please try again.',
};

/**
 * Get user-friendly error message for a specific error code
 */
export function getErrorMessage(errorCode: ErrorCodes, fallbackMessage?: string): string {
  return ERROR_MESSAGES[errorCode] || fallbackMessage || 'An unexpected error occurred.';
}
