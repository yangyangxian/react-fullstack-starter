// Example: /api/hello response
export interface HelloResponse {
  message: string;
}

// Example: /api/hello/:name response
export interface HelloNameResponse {
  message: string;
}

export interface HelloNameRequest {
  name: string;
}