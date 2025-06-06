import { HelloResponse, HelloNameResponse } from '@fullstack/common';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || '';

export async function getHello(): Promise<HelloResponse> {
  const response = await fetch(`${API_BASE_URL}/api/hello`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getHelloName(name: string): Promise<HelloNameResponse> {
  const response = await fetch(`${API_BASE_URL}/api/hello/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
} 