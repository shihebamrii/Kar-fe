import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Car,
  Plus,
  Wrench,
  Trash2,
  LogOut,
  User,
  CheckCircle2,
  Activity,
  Fuel,
  X,
  Wifi,
  Signal,
  Battery,
  Disc,
  Droplet,
  Wind,
  MoreHorizontal,
  ChevronLeft,
  Calendar,
  Gauge
} from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { vehicleService } from '../../services/vehicleService';
import { serviceService } from '../../services/serviceService';
import type { Vehicle, Service } from '../../types/api';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Vehicle Form State
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    immatriculation: ''
  });

  // Add Service Sheet State
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [addStep, setAddStep] = useState(1); // 1: Type Selection, 2: Details
  const [selectedType, setSelectedType] = useState<Service['type'] | null>(null);
  const [serviceForm, setServiceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    kilometrage: 0,
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [vehiclesData, servicesData] = await Promise.all([
        vehicleService.getAll(),
        serviceService.getAll()
      ]);
      setVehicles(vehiclesData);
      setServices(servicesData);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vehicleService.create(vehicleForm);
      toast.success('Véhicule ajouté avec succès');
      setShowVehicleForm(false);
      setVehicleForm({
        marque: '',
        modele: '',
        annee: new Date().getFullYear(),
        immatriculation: ''
      });
      loadData();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du véhicule');
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || vehicles.length === 0) return;

    try {
      await serviceService.create({
        vehicle: vehicles[0]._id, // Default to first vehicle for now as per design
        type: selectedType,
        ...serviceForm
      });
      toast.success('Service ajouté avec succès');

      // Reset and close
      setShowAddSheet(false);
      setAddStep(1);
      setSelectedType(null);
      setServiceForm({
        date: new Date().toISOString().split('T')[0],
        kilometrage: 0,
        notes: ''
      });

      loadData();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du service');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;
    try {
      await vehicleService.delete(id);
      toast.success('Véhicule supprimé');
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

  const openAddSheet = () => {
    if (vehicles.length === 0) {
      toast.warning('Veuillez d\'abord ajouter un véhicule');
      return;
    }
    setShowAddSheet(true);
    setAddStep(1);
  };

  const selectType = (type: Service['type']) => {
    setSelectedType(type);
    setAddStep(2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Group services by vehicle for the "Active Vehicle" display
  const activeVehicle = vehicles.length > 0 ? vehicles[0] : null;
  const activeVehicleServices = activeVehicle
    ? services.filter(s => typeof s.vehicle === 'string' ? s.vehicle === activeVehicle._id : s.vehicle._id === activeVehicle._id)
    : [];

  // Get latest mileage from services or default to 0
  const latestMileage = activeVehicleServices.length > 0
    ? Math.max(...activeVehicleServices.map(s => s.kilometrage))
    : 0;

  const serviceTypes: { type: Service['type'], icon: any, color: string }[] = [
    { type: 'Vidange', icon: Droplet, color: 'bg-blue-100 text-blue-600' },
    { type: 'Freins', icon: Disc, color: 'bg-red-100 text-red-600' },
    { type: 'Pneus', icon: Activity, color: 'bg-gray-100 text-gray-600' },
    { type: 'Filtres', icon: Wind, color: 'bg-green-100 text-green-600' },
    { type: 'Batterie', icon: Battery, color: 'bg-yellow-100 text-yellow-600' },
    { type: 'Révision', icon: Wrench, color: 'bg-purple-100 text-purple-600' },
    { type: 'Autre', icon: MoreHorizontal, color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-24 md:pb-8">

      {/* Mobile Status Bar Simulation */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-2 flex justify-between items-center md:hidden">
        <span className="text-[11px] font-semibold tracking-wide text-black">9:41</span>
        <div className="flex items-center gap-1.5 text-black">
          <Signal className="h-3 w-3" strokeWidth={2.5} />
          <Wifi className="h-3 w-3" strokeWidth={2.5} />
          <Battery className="h-4 w-4" strokeWidth={2.5} />
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-5xl md:px-6 md:py-8">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">

          {/* Left Column (Main Dashboard) */}
          <div className="space-y-6">

            {/* Header */}
            <div className="px-6 pt-6 md:px-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Bonjour</p>
                  <h3 className="text-2xl font-bold text-gray-900">{user?.username}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogout}
                    className="h-10 w-10 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                  <div className="h-10 w-10 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Car Card Area */}
            <div className="px-5 md:px-0">
              {vehicles.length === 0 ? (
                <div
                  onClick={() => setShowVehicleForm(true)}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 text-center cursor-pointer hover:shadow-lg transition-all border-2 border-dashed border-gray-300"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
                    <Plus size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Ajouter un véhicule</h3>
                  <p className="text-sm text-gray-500 mt-1">Commencez le suivi maintenant</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vehicles.map((vehicle, idx) => {
                    const vServices = services.filter(s => typeof s.vehicle === 'string' ? s.vehicle === vehicle._id : s.vehicle._id === vehicle._id);
                    const vMileage = vServices.length > 0 ? Math.max(...vServices.map(s => s.kilometrage)) : 0;

                    return (
                      <motion.div
                        key={vehicle._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden group"
                      >
                        {/* Decorative circles bg */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-100 text-xs font-medium bg-blue-500/30 px-2 py-0.5 rounded-lg border border-blue-400/30">
                                {idx === 0 ? 'Véhicule Actif' : 'Véhicule'}
                              </span>
                            </div>
                            <p className="font-bold text-xl tracking-tight">{vehicle.marque} {vehicle.modele}</p>
                            <p className="text-blue-200 text-xs font-mono mt-0.5">{vehicle.immatriculation}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                              <Car className="text-white h-5 w-5" />
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteVehicle(vehicle._id); }}
                              className="bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md p-2 rounded-xl border border-red-500/20 text-red-100 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 relative z-10">
                          <div className="bg-black/20 rounded-xl p-2.5 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-blue-100 text-[10px] mb-0.5">
                              <Activity size={10} /> Kilométrage
                            </div>
                            <div className="font-semibold text-sm">{vMileage.toLocaleString()} km</div>
                          </div>
                          <div className="bg-black/20 rounded-xl p-2.5 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 text-blue-100 text-[10px] mb-0.5">
                              <Fuel size={10} /> Année
                            </div>
                            <div className="font-semibold text-sm">{vehicle.annee}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Add Vehicle Button (Small) */}
                  {vehicles.length > 0 && (
                    <button
                      onClick={() => setShowVehicleForm(true)}
                      className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-medium text-sm hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Ajouter un autre véhicule
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Vehicle Form Modal/Expand */}
            <AnimatePresence>
              {showVehicleForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 md:px-0 overflow-hidden"
                >
                  <form onSubmit={handleVehicleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 relative">
                    <button
                      type="button"
                      onClick={() => setShowVehicleForm(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Nouveau Véhicule</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Marque (ex: Peugeot)"
                        required
                        value={vehicleForm.marque}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, marque: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Modèle (ex: 208)"
                        required
                        value={vehicleForm.modele}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, modele: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Année"
                          required
                          value={vehicleForm.annee}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, annee: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Immatriculation"
                          required
                          value={vehicleForm.immatriculation}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, immatriculation: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all mt-2"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column (History & Actions) */}
          <div className="space-y-6 mt-6 md:mt-0">

            {/* History Section */}
            <div className="px-5 md:px-0">
              <div className="flex justify-between items-center mb-3 px-1">
                <h4 className="text-sm font-bold text-gray-800">Historique</h4>
                {/* Removed old Add button */}
              </div>

              <div className="space-y-3 pb-20 md:pb-0">
                {services.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <p className="text-gray-400 text-xs">Aucun historique récent</p>
                  </div>
                ) : (
                  services
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((service, idx) => {
                      const sVehicle = vehicles.find(v => typeof service.vehicle === 'string' ? service.vehicle === v._id : service.vehicle._id === v._id);

                      // Determine icon and color based on type
                      let Icon = CheckCircle2;
                      let colorClass = "bg-teal-50 text-teal-600";

                      if (service.type === 'Vidange') { Icon = Droplet; colorClass = "bg-blue-50 text-blue-600"; }
                      else if (service.type === 'Freins') { Icon = Disc; colorClass = "bg-red-50 text-red-600"; }
                      else if (service.type === 'Pneus') { Icon = Activity; colorClass = "bg-gray-50 text-gray-600"; }
                      else if (service.type === 'Batterie') { Icon = Battery; colorClass = "bg-yellow-50 text-yellow-600"; }
                      else if (service.type === 'Filtres') { Icon = Wind; colorClass = "bg-green-50 text-green-600"; }
                      else if (service.type === 'Révision') { Icon = Wrench; colorClass = "bg-purple-50 text-purple-600"; }

                      return (
                        <motion.div
                          key={service._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100/80 hover:border-blue-200 transition-colors"
                        >
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${colorClass}`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{service.type}</p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {sVehicle ? `${sVehicle.marque} ${sVehicle.modele}` : 'Véhicule inconnu'} • {service.kilometrage.toLocaleString()} km
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                            {new Date(service.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </span>
                        </motion.div>
                      );
                    })
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Action Bar (Fixed on Mobile, Static on Desktop) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:static md:mt-8">
        <button
          onClick={openAddSheet}
          className="w-14 h-14 bg-gray-900 hover:bg-gray-800 transition-colors rounded-full flex items-center justify-center text-white shadow-xl shadow-gray-200 cursor-pointer active:scale-95 duration-200"
          aria-label="Ajouter un service"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Add Service Bottom Sheet */}
      <AnimatePresence>
        {showAddSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddSheet(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50 p-6 pb-10 max-w-md mx-auto md:max-w-2xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-2xl md:shadow-2xl"
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              {/* Handle bar for mobile */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>

              {addStep === 1 ? (
                // Step 1: Type Selection
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Choisir le service</h3>
                    <button onClick={() => setShowAddSheet(false)} className="p-2 bg-gray-50 rounded-full text-gray-500">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {serviceTypes.map((item) => (
                      <button
                        key={item.type}
                        onClick={() => selectType(item.type)}
                        className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon size={24} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{item.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Step 2: Details Form
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAddStep(1)} className="p-2 hover:bg-gray-100 rounded-full -ml-2">
                      <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <h3 className="text-lg font-bold text-gray-900">Détails {selectedType}</h3>
                  </div>

                  <form onSubmit={handleServiceSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Date</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Calendar size={18} />
                          </div>
                          <input
                            type="date"
                            required
                            value={serviceForm.date}
                            onChange={(e) => setServiceForm({ ...serviceForm, date: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">Kilométrage</label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Gauge size={18} />
                          </div>
                          <input
                            type="number"
                            required
                            placeholder="ex: 120000"
                            value={serviceForm.kilometrage || ''}
                            onChange={(e) => setServiceForm({ ...serviceForm, kilometrage: parseInt(e.target.value) })}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-base mt-4"
                    >
                      Confirmer
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
