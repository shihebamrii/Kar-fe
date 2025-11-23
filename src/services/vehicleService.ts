import { apiClient } from '../utils/api';
import type { ApiResponse, Vehicle, VehicleResponse, CreateVehicleRequest } from '../types/api';

export const vehicleService = {
  /**
   * Get all vehicles for the authenticated user
   */
  async getAll(): Promise<Vehicle[]> {
    const response = await apiClient.get<VehicleResponse>('/api/vehicles');
    
    if (response.success && response.data) {
      return response.data.vehicles;
    }
    
    throw new Error(response.message || 'Failed to fetch vehicles');
  },

  /**
   * Get a single vehicle by ID
   */
  async getById(id: string): Promise<Vehicle> {
    const response = await apiClient.get<{ vehicle: Vehicle }>(`/api/vehicles/${id}`);
    
    if (response.success && response.data) {
      return response.data.vehicle;
    }
    
    throw new Error(response.message || 'Failed to fetch vehicle');
  },

  /**
   * Create a new vehicle
   */
  async create(vehicleData: CreateVehicleRequest): Promise<Vehicle> {
    const response = await apiClient.post<{ vehicle: Vehicle }>('/api/vehicles', vehicleData);
    
    if (response.success && response.data) {
      return response.data.vehicle;
    }
    
    throw new Error(response.message || 'Failed to create vehicle');
  },

  /**
   * Update a vehicle
   */
  async update(id: string, vehicleData: Partial<CreateVehicleRequest>): Promise<Vehicle> {
    const response = await apiClient.put<{ vehicle: Vehicle }>(`/api/vehicles/${id}`, vehicleData);
    
    if (response.success && response.data) {
      return response.data.vehicle;
    }
    
    throw new Error(response.message || 'Failed to update vehicle');
  },

  /**
   * Delete a vehicle
   */
  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/api/vehicles/${id}`);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete vehicle');
    }
  },
};

