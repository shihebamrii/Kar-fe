import React from 'react';
import FeatureCard from './FeatureCard';
import { Plus, History, Bell, CreditCard, FileText, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Plus,
      title: 'Ajouter un service',
      description: 'Enregistrez facilement tous vos services : vidange, révision, réparations, et plus encore.',
      color: 'blue' as const,
    },
    {
      icon: History,
      title: 'Historique complet',
      description: 'Consultez l\'historique détaillé de tous les services effectués sur votre véhicule.',
      color: 'teal' as const,
    },
    {
      icon: Bell,
      title: 'Alertes révision',
      description: 'Recevez des rappels automatiques pour vos prochaines révisions et entretiens.',
      color: 'green' as const,
    },
    {
      icon: CreditCard,
      title: 'Accès par carte NFC',
      description: 'Scannez votre carte NFC pour accéder instantanément à toutes vos données.',
      color: 'purple' as const,
    },
    {
      icon: FileText,
      title: 'Export PDF',
      description: 'Téléchargez un carnet d\'entretien PDF complet pour vos démarches administratives.',
      color: 'blue' as const,
    },
    {
      icon: Shield,
      title: 'Données sécurisées',
      description: 'Vos données sont protégées et sauvegardées de manière sécurisée dans le cloud.',
      color: 'teal' as const,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin pour suivre votre voiture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Karhabti vous offre tous les outils nécessaires pour maintenir un historique
            complet et organisé de l'entretien de votre véhicule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;