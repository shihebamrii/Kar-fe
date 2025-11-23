import { apiClient } from '../utils/api';
import type { ApiResponse, NotificationResponse } from '../types/api';

export const notificationService = {
  /**
   * Get all notifications for the authenticated user
   */
  async getAll() {
    const response = await apiClient.get<NotificationResponse>('/api/notifications');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch notifications');
  },
};

