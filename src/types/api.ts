// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  error?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Vehicle Types
export interface Vehicle {
  _id: string;
  owner: string;
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  services?: Service[];
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleResponse {
  vehicles: Vehicle[];
  count: number;
}

// Service Types
export type ServiceType = 'Vidange' | 'Freins' | 'Pneus' | 'Filtres' | 'Batterie' | 'Révision' | 'Autre';

export interface Service {
  _id: string;
  vehicle: string | Vehicle;
  type: ServiceType;
  date: string;
  kilometrage: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceResponse {
  services: Service[];
  count: number;
}

// Notification Types
export interface Notification {
  type: 'upcoming_service' | 'overdue_service';
  priority: 'high' | 'medium' | 'low';
  vehicle: {
    id: string;
    marque: string;
    modele: string;
    immatriculation: string;
  };
  serviceType: ServiceType;
  daysUntilService?: number;
  daysOverdue?: number;
  lastServiceDate: string;
  lastServiceKilometrage: number;
  message: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  count: number;
  summary: {
    high: number;
    medium: number;
    low: number;
  };
}

// Register/Login Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateVehicleRequest {
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
}

export interface CreateServiceRequest {
  vehicle: string;
  type: ServiceType;
  date: string;
  kilometrage: number;
  notes?: string;
}

