import { HelloResDto, UserResDto } from '@fullstack/common';
import { API_BASE_URL } from '../appConfig.js';
import logger from '../utils/logger.js';

export async function getHello(): Promise<HelloResDto> {
  logger.info(`Fetching hello api:${API_BASE_URL}/api/hello`)
  const response = await fetch(`${API_BASE_URL}/api/hello`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getUserById(userId: string): Promise<UserResDto> {
  const response = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(userId)}`);
  if (!response.ok) {
    // Attempt to parse the error response from the server
    const errorData = await response.json().catch(() => null); // Gracefully handle non-JSON error responses
    if (errorData && errorData.error) {
      throw new Error(`API error: ${errorData.error.message} (Details: ${errorData.error.details || 'N/A'})`);
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const apiResponse = await response.json();
  if (apiResponse.error) {
    // Handle cases where the API signals failure in its own structure, even with a 2xx HTTP status
    throw new Error(apiResponse.error.message || 'Failed to fetch user data');
  } else if (apiResponse.data) {
    return apiResponse.data as UserResDto;
  } else {
    throw new Error('No data received from API');
  }
}