"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  ChevronLeft, 
  Upload, 
  Send, 
  Phone, 
  Clock 
} from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous ajouterez votre logique d'enregistrement en base de données
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-[#E5D6C8]">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-serif text-[#2D2D2D] mb-4 font-bold">Merci pour votre demande !</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Nous avons bien reçu votre message. <br />
            Un membre de notre équipe vous contactera sous <span className="font-bold text-[#A66D3B]">24 à 48 heures</span>.
          </p>
          
          <div className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#E5D6C8] mb-8">
            <p className="text-sm font-bold text-[#A66D3B] uppercase tracking-widest mb-3">Besoin urgent ?</p>
            <div className="flex items-center justify-center gap-3 text-[#2D2D2D] font-bold text-xl">
              <Phone className="w-6 h-6" />
              <a href="tel:0600000000">06 XX XX XX XX</a>
            </div>
          </div>

          <Link href="/" className="text-[#A66D3B] font-bold uppercase text-sm tracking-widest hover:underline flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header de la page */}
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#A66D3B] mb-8 transition-colors group">
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Retour</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E5D6C8]">
          <div className="bg-[#A66D3B] p-8 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Demande de devis</h1>
            <p className="opacity-90 italic">Remplissez le formulaire ci-dessous, nous vous contacterons rapidement.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
            
            {/* Infos Personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nom complet *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Téléphone *</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="06..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="exemple@mail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Ville</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="Casablanca" />
              </div>
            </div>

            {/* Détails du projet */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Type de projet *</label>
              <select required className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50">
                <option value="">Sélectionnez une catégorie</option>
                <option value="cuisine">Cuisine</option>
                <option value="salon">Salon</option>
                <option value="chambre">Chambre</option>
                <option value="bureau">Bureau</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Description du besoin *</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="Décrivez votre projet en quelques lignes..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Budget estimé (optionnel)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" placeholder="Ex: 5000 DH" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Photos (optionnel)</label>
                <div className="relative group cursor-pointer border-2 border-dashed border-[#E5D6C8] rounded-xl p-3 text-center hover:bg-gray-50 transition">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Upload className="w-4 h-4 text-[#A66D3B]" />
                    <span className="text-xs">Joindre des photos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton d'envoi */}
            <div className="pt-4">
              <button type="submit" className="w-full bg-[#A66D3B] hover:bg-[#8B5A2B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg text-lg uppercase tracking-widest">
                <span>Envoyer ma demande de devis</span>
                <Send className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
                <Clock className="w-3 h-3" />
                <span>Réponse garantie sous 48h maximum</span>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}