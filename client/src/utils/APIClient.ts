import { ApiResponse, ApiErrorResponse } from '@fullstack/common';
import { API_BASE_URL } from '../appConfig.js';
import logger from '../utils/logger.js';

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async get<TResponse>(
    endpoint: string,
    queryParams?: Record<string, string>
  ): Promise<TResponse> {
    return this.makeRequest<void, TResponse>(endpoint, 'GET', undefined, queryParams);
  }

  async post<TRequestBody, TResponse>(
    endpoint: string,
    requestBody: TRequestBody,
    queryParams?: Record<string, string>
  ): Promise<TResponse> {
    return this.makeRequest<TRequestBody, TResponse>(endpoint, 'POST', requestBody, queryParams);
  }

  async put<TRequestBody, TResponse>(
    endpoint: string,
    requestBody: TRequestBody,
    queryParams?: Record<string, string>
  ): Promise<TResponse> {
    return this.makeRequest<TRequestBody, TResponse>(endpoint, 'PUT', requestBody, queryParams);
  }

  async delete<TResponse = void>(
    endpoint: string,
    queryParams?: Record<string, string>
  ): Promise<TResponse> {
    return this.makeRequest<void, TResponse>(endpoint, 'DELETE', undefined, queryParams);
  }

  private async makeRequest<TRequestBody, TResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestBody?: TRequestBody,
    queryParams?: Record<string, string>
  ): Promise<TResponse> {
    let url = `${this.baseURL}${endpoint}`;
    if (queryParams) {
      const searchParams = new URLSearchParams(queryParams);
      url += `?${searchParams.toString()}`;
    }

    logger.info(`${method} request to: ${url}`, requestBody || '');

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // This ensures cookies are sent with requests
    };

    if (requestBody && method !== 'GET') {
      requestOptions.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, requestOptions);
    return this.handleResponse<TResponse>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData && errorData.error) {
        // Throw the ApiErrorResponse directly
        throw errorData.error as ApiErrorResponse;
      }
      // Fallback error if response is not in our expected format
      throw {
        code: 'HTTP_ERROR',
        message: `HTTP error! status: ${response.status}`,
        timestamp: new Date().toISOString()
      } as ApiErrorResponse;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const apiResponse: ApiResponse<T> = await response.json();
    logger.info(`Received response:`, apiResponse);

    if (apiResponse.error) {
      // Handle cases where the API signals failure in its own structure, even with a 2xx HTTP status
      throw apiResponse.error;
    } else if (apiResponse.data !== undefined && apiResponse.data !== null) {
      return apiResponse.data as T;
    } else {
      throw {
        code: 'NO_DATA',
        message: 'No data received from API',
        timestamp: new Date().toISOString()
      } as ApiErrorResponse;
    }
  }
}

export const apiClient = new APIClient();
