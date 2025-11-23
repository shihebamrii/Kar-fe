import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Général',
      questions: [
        {
          question: 'Qu\'est-ce que Karhabti ?',
          answer: 'Karhabti est une solution innovante qui vous permet de suivre l\'entretien de votre voiture grâce à une carte NFC. Scannez simplement votre carte avec votre smartphone pour accéder à l\'historique complet de votre véhicule.'
        },
        {
          question: 'Comment fonctionne la carte NFC ?',
          answer: 'La carte NFC contient une puce qui, lorsqu\'elle est scannée avec un smartphone compatible NFC, vous redirige vers votre espace personnel Karhabti. Vous pouvez alors consulter et gérer l\'historique de votre véhicule.'
        },
        {
          question: 'Mon smartphone est-il compatible ?',
          answer: 'La plupart des smartphones récents (Android et iPhone) sont équipés de la technologie NFC. Vous pouvez vérifier dans les paramètres de votre téléphone si le NFC est disponible et activé.'
        }
      ]
    },
    {
      category: 'Commande et livraison',
      questions: [
        {
          question: 'Comment commander ma carte Karhabti ?',
          answer: 'Vous pouvez commander votre carte directement sur notre site web. Le processus est simple : choisissez votre quantité, procédez au paiement sécurisé, et nous nous occupons du reste.'
        },
        {
          question: 'Quels sont les délais de livraison ?',
          answer: 'Nous livrons partout en Tunisie sous 48h ouvrables. La livraison est gratuite pour toutes les commandes.'
        },
        {
          question: 'Puis-je suivre ma commande ?',
          answer: 'Oui, vous recevrez un email de confirmation avec un numéro de suivi dès l\'expédition de votre commande.'
        }
      ]
    },
    {
      category: 'Utilisation',
      questions: [
        {
          question: 'Comment créer mon compte ?',
          answer: 'Vous pouvez créer votre compte de deux façons : soit en scannant votre carte NFC qui vous guidera automatiquement, soit en vous inscrivant directement sur notre site web.'
        },
        {
          question: 'Puis-je gérer plusieurs véhicules ?',
          answer: 'Absolument ! Vous pouvez ajouter autant de véhicules que vous le souhaitez à votre compte Karhabti et suivre l\'entretien de chacun séparément.'
        },
        {
          question: 'Comment ajouter un service d\'entretien ?',
          answer: 'Connectez-vous à votre espace, sélectionnez votre véhicule, cliquez sur "Ajouter un service" et remplissez les informations : type de service, date, kilométrage, notes, et éventuellement des photos.'
        },
        {
          question: 'Puis-je exporter mes données ?',
          answer: 'Oui, vous pouvez télécharger un carnet d\'entretien PDF complet pour chaque véhicule, idéal pour les démarches administratives ou la revente.'
        }
      ]
    },
    {
      category: 'Technique',
      questions: [
        {
          question: 'Mes données sont-elles sécurisées ?',
          answer: 'Oui, toutes vos données sont chiffrées et stockées de manière sécurisée. Nous respectons les standards de sécurité les plus élevés et ne partageons jamais vos informations personnelles.'
        },
        {
          question: 'Que se passe-t-il si je perds ma carte ?',
          answer: 'Pas de panique ! Vos données restent accessibles via votre compte en ligne. Vous pouvez commander une nouvelle carte et nous la lierons à votre compte existant.'
        },
        {
          question: 'L\'application fonctionne-t-elle hors ligne ?',
          answer: 'L\'application nécessite une connexion internet pour synchroniser vos données. Cependant, vous pouvez consulter les informations de base même hors ligne après avoir scanné votre carte.'
        }
      ]
    },
    {
      category: 'Support',
      questions: [
        {
          question: 'Comment contacter le support ?',
          answer: 'Notre équipe support est disponible 7j/7 par email à support@karhabti.tn, par téléphone au +216 12 345 678, ou via WhatsApp. Nous répondons généralement sous 2h.'
        },
        {
          question: 'Y a-t-il une garantie ?',
          answer: 'Oui, nous offrons une garantie satisfait ou remboursé de 30 jours. Si vous n\'êtes pas entièrement satisfait, nous vous remboursons intégralement.'
        },
        {
          question: 'Les mises à jour sont-elles payantes ?',
          answer: 'Non, toutes les mises à jour de l\'application et les nouvelles fonctionnalités sont gratuites à vie pour tous les détenteurs d\'une carte Karhabti.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  let questionIndex = 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Trouvez rapidement les réponses à toutes vos questions sur Karhabti
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune question trouvée pour "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const currentIndex = questionIndex++;
                      const isOpen = openItems.includes(currentIndex);
                      
                      return (
                        <div
                          key={faqIndex}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm"
                        >
                          <button
                            onClick={() => toggleItem(currentIndex)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
                          >
                            <span className="font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notre équipe support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Nous contacter
            </a>
            <a
              href="https://wa.me/21612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold rounded-xl transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}