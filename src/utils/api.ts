import type { ApiResponse } from '../types/api';

// API Base URL - defaults to localhost:3000 (Next.js backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kar-be.onrender.com';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Get stored user from localStorage
export const getStoredUser = () => {
  const userStr = localStorage.getItem('auth_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

// Set user in localStorage
export const setStoredUser = (user: any): void => {
  localStorage.setItem('auth_user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeStoredUser = (): void => {
  localStorage.removeItem('auth_user');
};

// API Client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Include credentials for CORS requests
      });

      const data: ApiResponse<T> = await response.json();

      // If unauthorized, clear auth data
      if (response.status === 401) {
        removeAuthToken();
        removeStoredUser();
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login';
        }
      }

      // If response is not ok, throw error with message
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export API base URL for reference
export const API_BASE = API_BASE_URL;

