import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, FileText, Scale } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Mentions légales
          </h1>
          <p className="text-xl text-gray-600">
            Informations légales et conditions d'utilisation de Karhabti
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Company Information */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Informations sur l'entreprise</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>Raison sociale :</strong> Karhabti SARL</p>
                <p><strong>Adresse :</strong> Tunis, Tunisie</p>
                <p><strong>Email :</strong> contact@karhabti.tn</p>
                <p><strong>Téléphone :</strong> +216 12 345 678</p>
                <p><strong>Directeur de publication :</strong> [Nom du directeur]</p>
                <p><strong>Hébergement :</strong> [Informations hébergeur]</p>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <Scale className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Conditions d'utilisation</h2>
              </div>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptation des conditions</h3>
                  <p>
                    En utilisant le service Karhabti, vous acceptez pleinement et sans réserve les présentes 
                    conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, 
                    veuillez ne pas utiliser notre service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Description du service</h3>
                  <p>
                    Karhabti est un service de suivi d'entretien automobile utilisant la technologie NFC. 
                    Le service permet aux utilisateurs d'enregistrer, consulter et gérer l'historique 
                    d'entretien de leurs véhicules.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsabilités de l'utilisateur</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fournir des informations exactes et à jour</li>
                    <li>Maintenir la confidentialité de ses identifiants de connexion</li>
                    <li>Utiliser le service conformément à sa destination</li>
                    <li>Ne pas tenter de compromettre la sécurité du système</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation de responsabilité</h3>
                  <p>
                    Karhabti s'efforce de fournir un service fiable, mais ne peut garantir 
                    une disponibilité de 100%. Nous ne saurions être tenus responsables des 
                    dommages indirects résultant de l'utilisation ou de l'impossibilité 
                    d'utiliser notre service.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Politique de confidentialité</h2>
              </div>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Collecte des données</h3>
                  <p>
                    Nous collectons uniquement les données nécessaires au fonctionnement du service :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Informations de compte (nom, email)</li>
                    <li>Données des véhicules (marque, modèle, immatriculation)</li>
                    <li>Historique des services d'entretien</li>
                    <li>Données de navigation (cookies techniques)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Utilisation des données</h3>
                  <p>
                    Vos données sont utilisées exclusivement pour :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Fournir le service de suivi d'entretien</li>
                    <li>Envoyer des rappels d'entretien</li>
                    <li>Améliorer notre service</li>
                    <li>Assurer le support client</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Protection des données</h3>
                  <p>
                    Nous mettons en œuvre des mesures de sécurité appropriées pour protéger 
                    vos données contre l'accès non autorisé, la modification, la divulgation 
                    ou la destruction. Toutes les données sont chiffrées en transit et au repos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Vos droits</h3>
                  <p>
                    Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>Droit d'accès à vos données</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la portabilité</li>
                    <li>Droit d'opposition</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Conservation des données</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Données de compte :</strong> Conservées tant que votre compte est actif, 
                  puis supprimées 3 ans après la dernière connexion.
                </p>
                <p>
                  <strong>Historique d'entretien :</strong> Conservé pendant 10 ans pour des raisons 
                  légales et pratiques (revente du véhicule, garanties).
                </p>
                <p>
                  <strong>Données de navigation :</strong> Cookies supprimés automatiquement 
                  selon leur durée de vie (maximum 13 mois).
                </p>
                <p>
                  <strong>Suppression sur demande :</strong> Vous pouvez demander la suppression 
                  immédiate de toutes vos données en nous contactant.
                </p>
              </div>
            </div>

            {/* Contact for Legal */}
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Questions juridiques ?
              </h2>
              <p className="text-gray-700 mb-6">
                Pour toute question concernant ces mentions légales ou l'exercice de vos droits, 
                contactez-nous.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Nous contacter
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}