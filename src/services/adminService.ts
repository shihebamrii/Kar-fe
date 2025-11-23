import { apiClient } from '../utils/api';
import type { ApiResponse, User, Vehicle, Service } from '../types/api';

export interface AdminStats {
  overview: {
    totalUsers: number;
    totalAdmins: number;
    totalRegularUsers: number;
    totalVehicles: number;
    totalServices: number;
    newUsersLastMonth: number;
    newVehiclesLastMonth: number;
    newServicesLastMonth: number;
  };
  servicesByType: Array<{ _id: string; count: number }>;
  vehiclesByBrand: Array<{ _id: string; count: number }>;
  servicesByMonth: Array<{ _id: string; count: number }>;
  topUsers: Array<{ _id: string; username: string; vehicleCount: number }>;
  topVehicles: Array<{ _id: string; marque: string; modele: string; serviceCount: number }>;
  recentServices: Service[];
}

export interface AdminUsersResponse {
  users: User[];
  count: number;
}

export interface AdminVehiclesResponse {
  vehicles: Vehicle[];
  count: number;
}

export interface AdminServicesResponse {
  services: Service[];
  count: number;
}

export const adminService = {
  /**
   * Get admin statistics
   */
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/api/admin/stats');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch admin statistics');
  },

  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<AdminUsersResponse>('/api/admin/users');
    
    if (response.success && response.data) {
      return response.data.users;
    }
    
    throw new Error(response.message || 'Failed to fetch users');
  },

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<{ user: User }>(`/api/admin/users/${id}`);
    
    if (response.success && response.data) {
      return response.data.user;
    }
    
    throw new Error(response.message || 'Failed to fetch user');
  },

  /**
   * Update user
   */
  async updateUser(id: string, userData: Partial<{ username: string; email: string; role: 'user' | 'admin' }>): Promise<User> {
    const response = await apiClient.put<{ user: User }>(`/api/admin/users/${id}`, userData);
    
    if (response.success && response.data) {
      return response.data.user;
    }
    
    throw new Error(response.message || 'Failed to update user');
  },

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    const response = await apiClient.delete(`/api/admin/users/${id}`);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete user');
    }
  },

  /**
   * Get all vehicles
   */
  async getVehicles(): Promise<Vehicle[]> {
    const response = await apiClient.get<AdminVehiclesResponse>('/api/admin/vehicles');
    
    if (response.success && response.data) {
      return response.data.vehicles;
    }
    
    throw new Error(response.message || 'Failed to fetch vehicles');
  },

  /**
   * Get all services
   */
  async getServices(): Promise<Service[]> {
    const response = await apiClient.get<AdminServicesResponse>('/api/admin/services');
    
    if (response.success && response.data) {
      return response.data.services;
    }
    
    throw new Error(response.message || 'Failed to fetch services');
  },
};

