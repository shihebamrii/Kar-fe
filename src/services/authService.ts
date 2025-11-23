import { apiClient, setAuthToken, setStoredUser, removeAuthToken, removeStoredUser, getStoredUser } from '../utils/api';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '../types/api';

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
    
    if (response.success && response.data) {
      const { user, token } = response.data;
      
      // Store token and user
      setAuthToken(token);
      setStoredUser(user);
      
      return { user, token };
    }
    
    throw new Error(response.message || 'Login failed');
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<{ user: User; token: string }> {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', userData);
    
    if (response.success && response.data) {
      const { user, token } = response.data;
      
      // Store token and user
      setAuthToken(token);
      setStoredUser(user);
      
      return { user, token };
    }
    
    throw new Error(response.message || 'Registration failed');
  },

  /**
   * Logout user (clear stored data)
   */
  logout(): void {
    removeAuthToken();
    removeStoredUser();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  /**
   * Get current user from storage
   */
  getCurrentUser(): User | null {
    return getStoredUser();
  },
};

// Helper function to get auth token (for internal use)
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

