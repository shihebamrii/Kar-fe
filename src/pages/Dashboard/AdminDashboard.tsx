import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Car, Wrench, TrendingUp, LogOut, User, Shield, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/adminService';
import type { AdminStats } from '../../services/adminService';
import type { User as UserType } from '../../types/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [garages, setGarages] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // User Edit State
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: 'user' as 'user' | 'admin' | 'garage'
  });

  // Garage Create/Edit State
  const [showGarageModal, setShowGarageModal] = useState(false);
  const [garageForm, setGarageForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isEditingGarage, setIsEditingGarage] = useState(false);
  const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsData, usersData, garagesData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getGarages()
      ]);
      setStats(statsData);
      setUsers(usersData);
      setGarages(garagesData);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // User Management Handlers
  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role || 'user'
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      // Handle both id and _id from backend
      const userId = selectedUser.id || (selectedUser as any)._id;
      await adminService.updateUser(userId, editForm);
      toast.success('Utilisateur mis à jour');
      setShowEditModal(false);
      loadData();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) return;
    try {
      await adminService.deleteUser(id);
      toast.success('Utilisateur supprimé');
      loadData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Garage Management Handlers
  const handleCreateGarage = () => {
    setIsEditingGarage(false);
    setGarageForm({ username: '', email: '', password: '' });
    setShowGarageModal(true);
  };

  const handleEditGarage = (garage: UserType) => {
    setIsEditingGarage(true);
    // Handle both id and _id from backend
    const garageId = garage.id || (garage as any)._id;
    setSelectedGarageId(garageId);
    setGarageForm({
      username: garage.username,
      email: garage.email,
      password: '' // Password not editable directly here usually, or optional
    });
    setShowGarageModal(true);
  };

  const handleSaveGarage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditingGarage && selectedGarageId) {
        await adminService.updateGarage(selectedGarageId, {
          username: garageForm.username,
          email: garageForm.email
        });
        toast.success('Garage mis à jour');
      } else {
        await adminService.createGarage(garageForm);
        toast.success('Garage créé');
      }
      setShowGarageModal(false);
      loadData();
    } catch (error) {
      toast.error(isEditingGarage ? 'Erreur lors de la mise à jour' : 'Erreur lors de la création');
    }
  };

  const handleDeleteGarage = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce garage ?')) return;
    try {
      await adminService.deleteGarage(id);
      toast.success('Garage supprimé');
      loadData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Déconnexion réussie');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Tableau de bord Administrateur
                </h1>
              </div>
              <p className="text-gray-600 mt-1">Gestion de la plateforme Karhabti</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Utilisateurs</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.overview.totalUsers}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{stats.overview.newUsersLastMonth} ce mois
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Véhicules</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.overview.totalVehicles}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{stats.overview.newVehiclesLastMonth} ce mois
                    </p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Car className="h-8 w-8 text-teal-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Services</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.overview.totalServices}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{stats.overview.newServicesLastMonth} ce mois
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Wrench className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Administrateurs</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.overview.totalAdmins}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.overview.totalRegularUsers} utilisateurs
                    </p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Garages Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gestion des Garages</h2>
            <button
              onClick={handleCreateGarage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Ajouter un Garage
            </button>
          </div>

          {garages.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun garage</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Garage</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {garages.map((g) => (
                    <tr key={g.id || (g as any)._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <Wrench className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-900">{g.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{g.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditGarage(g)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteGarage(g.id || (g as any)._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Users Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Utilisateurs</h2>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun utilisateur</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Utilisateur</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rôle</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id || (u as any)._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{u.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : u.role === 'garage'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}>
                          {u.role === 'admin' ? 'Administrateur' : u.role === 'garage' ? 'Garage' : 'Utilisateur'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditUser(u)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {(u.id || (u as any)._id) !== (user?.id || (user as any)?._id) && (
                            <button
                              onClick={() => handleDeleteUser(u.id || (u as any)._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Modifier l'utilisateur</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                <input
                  type="text"
                  required
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value as 'user' | 'admin' | 'garage' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                  <option value="garage">Garage</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Garage Create/Edit Modal */}
      {showGarageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isEditingGarage ? 'Modifier le Garage' : 'Ajouter un Garage'}
            </h3>
            <form onSubmit={handleSaveGarage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Garage</label>
                <input
                  type="text"
                  required
                  value={garageForm.username}
                  onChange={(e) => setGarageForm({ ...garageForm, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom du garage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={garageForm.email}
                  onChange={(e) => setGarageForm({ ...garageForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@garage.com"
                />
              </div>
              {!isEditingGarage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <input
                    type="password"
                    required
                    value={garageForm.password}
                    onChange={(e) => setGarageForm({ ...garageForm, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="******"
                  />
                </div>
              )}
              <div className="flex space-x-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {isEditingGarage ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowGarageModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

