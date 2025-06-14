// Standard error response types for the API

export interface ApiErrorResponse {
  name: string;
  message: string;
  timestamp: string;
  stack?: string;
}
