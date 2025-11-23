import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/contexts/AuthContext';

import Home from './src/pages/Home';
import Features from './src/pages/Features';
import Pricing from './src/pages/Pricing';
import FAQ from './src/pages/FAQ';
import Contact from './src/pages/Contact';
import Legal from './src/pages/Legal';
import Login from './src/pages/Auth/Login';
import Register from './src/pages/Auth/Register';
import ForgotPassword from './src/pages/Auth/ForgotPassword';
import NotFound from './src/pages/NotFound';
import ClientDashboard from './src/pages/Dashboard/ClientDashboard';
import AdminDashboard from './src/pages/Dashboard/AdminDashboard';
import ProtectedRoute from './src/components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <Router>
          <main className="min-h-screen font-inter">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot" element={<ForgotPassword />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
              className="z-50"
            />
          </main>
        </Router>
      </AuthProvider>
    </Theme>
  );
}

export default App;