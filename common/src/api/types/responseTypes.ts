// This file will contain shared API/DTO types.
export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
  stack?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiErrorResponse;
}