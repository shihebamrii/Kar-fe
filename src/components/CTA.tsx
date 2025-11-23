import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <CreditCard className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à simplifier l'entretien de votre voiture ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez des milliers d'automobilistes qui utilisent déjà Karhabti 
            pour suivre l'entretien de leur véhicule en toute simplicité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Acheter ma carte maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              En savoir plus
            </Link>
          </div>
          
          <p className="text-blue-100 text-sm mt-6">
            Livraison gratuite • Support client 7j/7 • Garantie satisfait ou remboursé
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;