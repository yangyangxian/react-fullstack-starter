// This file will contain shared API/DTO types.
export interface ApiErrorResponse {
  name: string;
  message: string;
  timestamp: string;
  stack?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorResponse;
}