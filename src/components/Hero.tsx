import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  CreditCard, 
  CheckCircle2, 
  Car, 
  Fuel, 
  Activity, 
  Wifi,
  Battery,
  Signal,
  Plus
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content (Left Side) */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 border border-blue-200">
              <span className="flex h-2 w-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Nouveau: Technologie NFC Disponible
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Suivez l'entretien de votre voiture{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                en un clic
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Avec la carte NFC Karhabti, gardez un historique complet de tous vos services 
              et révisions. Scannez simplement votre carte pour accéder à toutes vos données.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30"
              >
                Créer un compte
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50 text-gray-700 font-semibold rounded-xl transition-all duration-200">
                <Play className="mr-2 h-5 w-5 text-blue-600" />
                Acheter Carte
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2" />
                Données sécurisées
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2" />
                iOS & Android
              </div>
            </div>
          </div>

          {/* Graphic / Mockup Area (Right Side) */}
          <div className="relative perspective-1000 z-20">
            <div className="relative mx-auto w-full max-w-[420px] h-[650px] flex items-center justify-center">
              
              {/* =========================
                 PHONE MOCKUP START 
                 ========================= */}
              {/* Outer Chassis (Titanium/Dark Grey) */}
              <div className="relative w-[300px] h-[620px] bg-gray-800 rounded-[3.5rem] shadow-2xl ring-1 ring-white/20 z-20 transform rotate-[-5deg] transition-transform duration-500 hover:rotate-0">
                
                {/* Physical Buttons */}
                <div className="absolute top-32 -left-[6px] h-10 w-[6px] bg-gray-700 rounded-l-md shadow-sm"></div> {/* Mute */}
                <div className="absolute top-48 -left-[6px] h-16 w-[6px] bg-gray-700 rounded-l-md shadow-sm"></div> {/* Vol Up */}
                <div className="absolute top-44 -right-[6px] h-24 w-[6px] bg-gray-700 rounded-r-md shadow-sm"></div> {/* Power */}

                {/* Black Bezel Layer */}
                <div className="absolute inset-[4px] bg-black rounded-[3.2rem] overflow-hidden border-[6px] border-black">
                  
                  {/* Screen Layer (Lit Area) */}
                  <div className="absolute inset-0 bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative">
                    
                    {/* Glass Reflection Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none z-50 rounded-[2.8rem]"></div>

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-[28px] bg-black rounded-full z-50 flex items-center justify-center px-2 gap-2">
                       <div className="w-2 h-2 rounded-full bg-gray-800/80 shadow-inner border border-gray-700"></div> {/* Camera Lens */}
                    </div>

                    {/* Status Bar */}
                    <div className="h-12 w-full flex justify-between items-center px-7 pt-2 z-40 text-black">
                        <span className="text-[11px] font-semibold tracking-wide">9:41</span>
                        <div className="flex items-center gap-1.5">
                            <Signal className="h-3 w-3" strokeWidth={2.5} />
                            <Wifi className="h-3 w-3" strokeWidth={2.5} />
                            <Battery className="h-4 w-4" strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* APP CONTENT */}
                    <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative z-10">
                        
                        {/* Header */}
                        <div className="px-6 pb-4 pt-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Bonjour</p>
                              <h3 className="text-xl font-bold text-gray-900">Karim B.</h3>
                            </div>
                            <div className="h-10 w-10 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-blue-600">
                              <Car size={20} />
                            </div>
                          </div>
                        </div>

                        {/* Main Scroll Area */}
                        <div className="px-5 space-y-5 pb-6 overflow-hidden">
                          
                          {/* Car Card */}
                          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
                            {/* Decorative circles bg */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                            
                            <div className="flex justify-between items-start mb-6 relative z-10">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-blue-100 text-xs font-medium bg-blue-500/30 px-2 py-0.5 rounded-lg border border-blue-400/30">Véhicule Actif</span>
                                </div>
                                <p className="font-bold text-xl tracking-tight">Golf 7 TDI</p>
                              </div>
                              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/10">
                                <Car className="text-white h-5 w-5" />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 relative z-10">
                              <div className="bg-black/20 rounded-xl p-2.5 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 text-blue-100 text-[10px] mb-0.5">
                                  <Activity size={10} /> Kilométrage
                                </div>
                                <div className="font-semibold text-sm">112,450 km</div>
                              </div>
                              <div className="bg-black/20 rounded-xl p-2.5 backdrop-blur-sm">
                                <div className="flex items-center gap-1.5 text-blue-100 text-[10px] mb-0.5">
                                  <Fuel size={10} /> Carburant
                                </div>
                                <div className="font-semibold text-sm">Diesel</div>
                              </div>
                            </div>
                          </div>

                          {/* List */}
                          <div>
                            <div className="flex justify-between items-center mb-3 px-1">
                                <h4 className="text-sm font-bold text-gray-800">Historique</h4>
                                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Tout voir</span>
                            </div>
                            
                            <div className="space-y-3">
                              {/* Item 1 */}
                              <div className="flex items-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100/80">
                                <div className="h-10 w-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mr-3 flex-shrink-0">
                                  <CheckCircle2 size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-gray-900 truncate">Vidange Complète</p>
                                  <p className="text-[10px] text-gray-500 truncate">Garage Tunis Central</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Hier</span>
                              </div>
                              
                              {/* Item 2 */}
                              <div className="flex items-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100/80">
                                <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mr-3 flex-shrink-0">
                                  <Activity size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-gray-900 truncate">Plaquettes Freins</p>
                                  <p className="text-[10px] text-gray-500 truncate">Speedy Marsa</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">20 Nov</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="mt-auto bg-white border-t border-gray-100 p-4 pb-8 flex justify-center">
                           <div className="w-12 h-12 bg-gray-900 hover:bg-gray-800 transition-colors rounded-full flex items-center justify-center text-white shadow-xl shadow-gray-200 cursor-pointer">
                              <Plus size={20} />
                           </div>
                        </div>

                    </div>
                  </div>
                </div>
              </div>
              {/* =========================
                 PHONE MOCKUP END 
                 ========================= */}

              {/* NFC Card */}
              <div className="absolute bottom-16 -right-1 w-64 h-40 bg-[#1a1a1a] rounded-xl shadow-2xl z-30 transform rotate-12 hover:rotate-6 transition-all duration-500 cursor-pointer group perspective-1000 border border-gray-800">
                {/* Holographic sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl pointer-events-none"></div>
                
                {/* Card Content */}
                <div className="relative h-full p-5 flex flex-col justify-between">
                  {/* Texture */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:8px_8px] rounded-xl"></div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    {/* Chip */}
                    <div className="w-10 h-7 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md shadow-inner border border-yellow-600/50 flex items-center justify-center">
                        <div className="w-4 h-3 border border-yellow-700/50 rounded-sm"></div>
                    </div>
                    <Wifi className="rotate-90 h-6 w-6 text-gray-500" />
                  </div>
                  
                  <div className="relative z-10">

                    <div className="flex justify-between items-end text-white">
                      <div>
                        <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-0.5">MEMBER</p>
                        <p className="font-medium text-sm tracking-wide shadow-black drop-shadow-sm">KARIM B.</p>
                      </div>
                      <img
                        src="https://waslatn.tn/_assets/media/e3182044261cd4d37a89237468f26ce6.png"
                        alt="Karhabti logo"
                        className="h-16 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation Waves */}
              <div className="absolute top-[65%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
                 <div className="relative">
                    <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full animate-ping"></div>
                    <div className="absolute w-32 h-32 bg-teal-500/20 rounded-full animate-ping delay-300"></div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob translate-y-1/3 -translate-x-1/3 animation-delay-2000"></div>
    </section>
  );
};

export default Hero;