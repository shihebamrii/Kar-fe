import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, CreditCard, Truck, Shield, Headphones } from 'lucide-react';

export default function Pricing() {
  const [quantity, setQuantity] = useState(1);

  const features = [
    'Carte NFC haute qualité',
    'Accès illimité à l\'application',
    'Historique complet des services',
    'Rappels automatiques',
    'Export PDF professionnel',
    'Synchronisation cloud',
    'Support client 7j/7',
    'Mises à jour gratuites',
    'Partage familial',
    'Analyses et statistiques'
  ];

  const benefits = [
    {
      icon: Truck,
      title: 'Livraison gratuite',
      description: 'Livraison gratuite partout en Tunisie sous 48h'
    },
    {
      icon: Shield,
      title: 'Garantie satisfait',
      description: 'Garantie satisfait ou remboursé 30 jours'
    },
    {
      icon: Headphones,
      title: 'Support premium',
      description: 'Support client dédié 7j/7 par téléphone et email'
    }
  ];

  const totalPrice = 24.9 * quantity;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Une solution simple, un prix transparent
          </h1>
          <p className="text-xl text-gray-600">
            Tout ce dont vous avez besoin pour suivre l'entretien de votre voiture, 
            sans abonnement ni frais cachés.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
              <div className="flex items-center justify-center space-x-3">
                <CreditCard className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Carte Karhabti</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Price and Order */}
                <div>
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {totalPrice.toFixed(3)} <span className="text-2xl text-gray-600">TND</span>
                    </div>
                    <p className="text-gray-600">Paiement unique, aucun abonnement</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Quantité
                      </label>
                      <select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>
                            {num} carte{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg">
                      Commander maintenant
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      Paiement sécurisé • Livraison sous 48h • Support inclus
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Tout ce qui est inclus :
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Karhabti ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <div className="bg-blue-100 text-blue-600 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Des questions ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Consultez notre FAQ pour obtenir des réponses à toutes vos questions 
            sur Karhabti et son fonctionnement.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200"
          >
            Voir la FAQ
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}