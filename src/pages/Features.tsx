import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Plus, 
  History, 
  Bell, 
  CreditCard, 
  FileText, 
  Shield,
  Smartphone,
  Cloud,
  Users,
  BarChart3
} from 'lucide-react';

export default function Features() {
  const mainFeatures = [
    {
      icon: Plus,
      title: 'Gestion complète des services',
      description: 'Enregistrez tous types de services : vidange, révision, réparations, changement de pneus, contrôle technique et bien plus.',
      details: [
        'Interface intuitive pour ajouter rapidement un service',
        'Catégorisation automatique des types de services',
        'Ajout de photos et documents justificatifs',
        'Suivi du kilométrage et des coûts'
      ]
    },
    {
      icon: History,
      title: 'Historique détaillé et recherche',
      description: 'Consultez l\'historique complet de votre véhicule avec des outils de recherche et de filtrage avancés.',
      details: [
        'Timeline chronologique de tous les services',
        'Filtres par type de service, date, garage',
        'Recherche rapide par mots-clés',
        'Vue calendrier pour planifier les entretiens'
      ]
    },
    {
      icon: Bell,
      title: 'Rappels intelligents',
      description: 'Système de notifications automatiques basé sur le kilométrage et les intervalles de temps.',
      details: [
        'Rappels personnalisables par type de service',
        'Notifications par email et SMS',
        'Calcul automatique des prochaines échéances',
        'Intégration avec votre calendrier'
      ]
    },
    {
      icon: CreditCard,
      title: 'Technologie NFC avancée',
      description: 'Carte NFC haute qualité pour un accès instantané à vos données, même hors ligne.',
      details: [
        'Accès instantané en scannant la carte',
        'Fonctionne avec tous les smartphones NFC',
        'Données de base accessibles hors ligne',
        'Sécurité renforcée avec chiffrement'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: FileText,
      title: 'Export et rapports',
      description: 'Générez des rapports PDF professionnels pour vos démarches administratives.'
    },
    {
      icon: Shield,
      title: 'Sécurité des données',
      description: 'Chiffrement de bout en bout et sauvegarde automatique dans le cloud.'
    },
    {
      icon: Smartphone,
      title: 'Application mobile',
      description: 'Interface optimisée pour mobile avec mode hors ligne disponible.'
    },
    {
      icon: Cloud,
      title: 'Synchronisation cloud',
      description: 'Vos données sont synchronisées en temps réel sur tous vos appareils.'
    },
    {
      icon: Users,
      title: 'Partage familial',
      description: 'Partagez l\'accès aux données du véhicule avec les membres de votre famille.'
    },
    {
      icon: BarChart3,
      title: 'Analyses et statistiques',
      description: 'Suivez vos dépenses d\'entretien et optimisez vos coûts.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Toutes les fonctionnalités pour gérer votre véhicule
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez en détail comment Karhabti révolutionne la gestion de l'entretien 
            automobile avec des outils modernes et intuitifs.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-blue-100 text-blue-600 inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-gray-100 rounded-2xl h-80 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="text-gray-400 text-center">
                    <feature.icon className="h-24 w-24 mx-auto mb-4" />
                    <p>Aperçu de l'interface</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Et bien plus encore...
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez toutes les fonctionnalités qui font de Karhabti la solution complète
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="bg-teal-100 text-teal-600 inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à découvrir toutes ces fonctionnalités ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Commandez votre carte Karhabti dès maintenant et profitez de tous ces outils
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Voir les tarifs
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}