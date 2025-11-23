# Frontend-Backend Integration Guide

This document explains how the frontend (kar-fe) is integrated with the backend (kar-be).

## Overview

The frontend is a React + TypeScript application using Vite, and it communicates with a Next.js backend API running on port 3000.

## Architecture

### API Client (`src/utils/api.ts`)
- Centralized API client with automatic token management
- Handles authentication headers automatically
- Manages localStorage for tokens and user data
- Automatic redirect to login on 401 errors

### Services Layer
- **`authService.ts`**: Authentication (login, register, logout)
- **`vehicleService.ts`**: Vehicle CRUD operations
- **`serviceService.ts`**: Service/maintenance record operations
- **`notificationService.ts`**: Notification fetching

### Authentication Context (`src/contexts/AuthContext.tsx`)
- Global authentication state management
- Provides `useAuth()` hook for components
- Automatically loads user from localStorage on app start

## Setup

### 1. Environment Variables

Create a `.env` file in `kar-fe/` directory:

```env
VITE_API_URL=https://kar-be.onrender.com
```

If not set, defaults to `https://kar-be.onrender.com`.

### 2. Backend Setup

Ensure the backend is running:

```bash
cd kar-be
npm install
# Create .env.local with MONGODB_URI and JWT_SECRET
npm run dev
```

The backend should be running on `https://kar-be.onrender.com`.

### 3. Frontend Setup

```bash
cd kar-fe
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default).

## API Integration

### Authentication Flow

1. **Login**: User submits email/password → `authService.login()` → Token stored in localStorage
2. **Register**: User submits form → `authService.register()` → Token stored in localStorage
3. **Auto-authentication**: On app load, user is loaded from localStorage if token exists
4. **Logout**: `authService.logout()` clears all stored data

### Using Authentication in Components

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication state
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user?.username}!</div>;
}
```

### Making API Calls

#### Example: Fetch Vehicles

```tsx
import { vehicleService } from '../services/vehicleService';
import { useEffect, useState } from 'react';

function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await vehicleService.getAll();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to load vehicles:', error);
      }
    }
    loadVehicles();
  }, []);
  
  return (
    <div>
      {vehicles.map(vehicle => (
        <div key={vehicle._id}>{vehicle.marque} {vehicle.modele}</div>
      ))}
    </div>
  );
}
```

#### Example: Create Vehicle

```tsx
import { vehicleService } from '../services/vehicleService';

async function handleCreateVehicle() {
  try {
    const vehicle = await vehicleService.create({
      marque: 'Peugeot',
      modele: '208',
      annee: 2020,
      immatriculation: 'AB-123-CD'
    });
    console.log('Vehicle created:', vehicle);
  } catch (error) {
    console.error('Failed to create vehicle:', error);
  }
}
```

## API Endpoints

All endpoints are prefixed with `/api`:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Services
- `GET /api/services` - List all services (with optional filters: `?type=Vidange&vehicleId=...`)
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Notifications
- `GET /api/notifications` - Get all notifications

## TypeScript Types

All API types are defined in `src/types/api.ts`:

- `User`, `Vehicle`, `Service`
- `ApiResponse<T>` - Generic API response wrapper
- Request/Response types for all endpoints

## Error Handling

The API client automatically:
- Handles 401 errors (unauthorized) by clearing auth data and redirecting to login
- Throws errors with meaningful messages
- Returns typed responses

Example error handling:

```tsx
try {
  await vehicleService.create(vehicleData);
  toast.success('Vehicle created!');
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  toast.error(message);
}
```

## Development Proxy

Vite is configured to proxy `/api` requests to the backend during development. This means:
- Frontend: `http://localhost:5173`
- API calls to `/api/*` are automatically proxied to `https://kar-be.onrender.com/api/*`

This avoids CORS issues during development.

## Production Deployment

For production:
1. Set `VITE_API_URL` to your production backend URL
2. Ensure CORS is properly configured on the backend (already done in `next.config.js`)
3. Build the frontend: `npm run build`
4. Deploy the built files to your hosting service

## Testing the Integration

1. Start the backend: `cd kar-be && npm run dev`
2. Start the frontend: `cd kar-fe && npm run dev`
3. Open `http://localhost:5173`
4. Navigate to `/auth/register` and create an account
5. Login at `/auth/login`
6. The authentication state should persist across page refreshes

## Troubleshooting

### CORS Errors
- Ensure backend `next.config.js` has CORS headers configured (already done)
- Check that `VITE_API_URL` points to the correct backend URL

### 401 Unauthorized
- Token might be expired (tokens expire after 7 days)
- User needs to login again
- Check that token is being sent in Authorization header

### Network Errors
- Ensure backend is running on the correct port
- Check `VITE_API_URL` environment variable
- Check browser console for detailed error messages

