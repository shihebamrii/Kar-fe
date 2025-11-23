import { apiClient } from '../utils/api';
import type { ApiResponse, Service, ServiceResponse, CreateServiceRequest } from '../types/api';

export const serviceService = {
  /**
   * Get all services for the authenticated user
   * @param filters Optional filters (type, vehicleId)
   */
  async getAll(filters?: { type?: string; vehicleId?: string }): Promise<Service[]> {
    const queryParams = new URLSearchParams();
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.vehicleId) queryParams.append('vehicleId', filters.vehicleId);
    
    const queryString = queryParams.toString();
    const endpoint = `/api/services${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get<ServiceResponse>(endpoint);
    
    if (response.success && response.data) {
      return response.data.services;
    }
    
    throw new Error(response.message || 'Failed to fetch services');
  },

  /**
   * Get a single service by ID
   */
  async getById(id: string): Promise<Service> {
    const response = await apiClient.get<{ service: Service }>(`/api/services/${id}`);
    
    if (response.success && response.data) {
      return response.data.service;
    }
    
    throw new Error(response.message || 'Failed to fetch service');
  },

  /**
   * Create a new service
   */
  async create(serviceData: CreateServiceRequest): Promise<Service> {
    const response = await apiClient.post<{ service: Service }>('/api/services', serviceData);
    
    if (response.success && response.data) {
      return response.data.service;
    }
    
    throw new Error(response.message || 'Failed to create service');
  },

  /**
   * Update a service
   */
  async update(id: string, serviceData: Partial<CreateServiceRequest>): Promise<Service> {
    const response = await apiClient.put<{ service: Service }>(`/api/services/${id}`, serviceData);
    
    if (response.success && response.data) {
      return response.data.service;
    }
    
    throw new Error(response.message || 'Failed to update service');
  },

  /**
   * Delete a service
   */
  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(`/api/services/${id}`);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete service');
    }
  },
};

