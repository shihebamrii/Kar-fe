import axios from 'axios';
import type { ApiResponse, User } from '../types/api';

const API_URL = 'https://kar-be.onrender.com/api';

// Helper to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const garageService = {
    // Get all users created by this garage
    getUsers: async (): Promise<ApiResponse<User[]>> => {
        try {
            const response = await axios.get(`${API_URL}/garage/users`, getAuthHeader());
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch users',
                error: error.message
            };
        }
    },

    // Create a new user
    createUser: async (userData: { username: string; email: string; password: string }): Promise<ApiResponse<User>> => {
        try {
            const response = await axios.post(`${API_URL}/garage/users`, userData, getAuthHeader());
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to create user',
                error: error.message
            };
        }
    },

    // Update a user
    updateUser: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
        try {
            const response = await axios.put(`${API_URL}/garage/users/${id}`, userData, getAuthHeader());
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update user',
                error: error.message
            };
        }
    },

    // Delete a user
    deleteUser: async (id: string): Promise<ApiResponse<{}>> => {
        try {
            const response = await axios.delete(`${API_URL}/garage/users/${id}`, getAuthHeader());
            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to delete user',
                error: error.message
            };
        }
    }
};
