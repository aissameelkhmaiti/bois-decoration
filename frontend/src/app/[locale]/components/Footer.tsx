import Image from "next/image";
import { Instagram, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D2D2D] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image src="/decor maison.png" alt="Logo" fill className="object-contain invert" />
              </div>
              <span className="text-xl font-bold tracking-tight">Aji Decory</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              L'excellence de la menuiserie artisanale à Casablanca. Nous transformons le bois en pièces uniques pour votre confort.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-[#A66D3B]">Navigation</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Accueil</a></li>
              <li><a href="#about" className="hover:text-white transition">À Propos</a></li>
              <li><a href="#services" className="hover:text-white transition">Nos Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition">Réalisations</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-[#A66D3B]">Expertises</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Aménagement Intérieur</li>
              <li>Terrasses & Pergolas</li>
              <li>Escaliers sur mesure</li>
              <li>Rénovation Bois</li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-[#A66D3B]">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#A66D3B] transition shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#A66D3B] transition shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Aji Decory. Tous droits réservés.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition"
          >
            Retour en haut
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}