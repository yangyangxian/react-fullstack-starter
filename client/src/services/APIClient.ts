import { HelloResDto, UserResDto } from '@fullstack/common';

let API_BASE_URL: string;

if (import.meta.env.MODE === 'production') {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; 
} else {
  API_BASE_URL = '';
}
console.log("API_BASE_URL:" + API_BASE_URL);

export async function getHello(): Promise<HelloResDto> {
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
  if (apiResponse.success && apiResponse.data) {
    return apiResponse.data as UserResDto;
  } else {
    // Handle cases where the API signals failure in its own structure, even with a 2xx HTTP status
    throw new Error(apiResponse.error?.message || 'Failed to fetch user data');
  }
}