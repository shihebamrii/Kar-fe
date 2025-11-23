import React from 'react';
import { ShoppingCart, Scan, BarChart3 } from 'lucide-react';

const Steps = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Acheter la carte',
      description: 'Commandez votre carte NFC Karhabti pour 24.900 TND avec livraison gratuite.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Scan,
      title: 'Scanner',
      description: 'Scannez votre carte avec votre smartphone pour créer votre compte et enregistrer votre véhicule.',
      color: 'bg-teal-100 text-teal-600',
    },
    {
      icon: BarChart3,
      title: 'Suivre l\'entretien',
      description: 'Ajoutez vos services, consultez l\'historique et recevez des rappels automatiques.',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600">
            Trois étapes simples pour commencer à suivre l'entretien de votre voiture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              )}

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} mb-6 mx-auto`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;