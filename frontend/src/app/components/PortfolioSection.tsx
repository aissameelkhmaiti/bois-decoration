import Image from "next/image";
import { ImagePlus, Sparkles } from "lucide-react";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-6  ">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-[#A66D3B] w-5 h-5" />
            <span className="text-sm font-bold tracking-[0.3em] text-[#A66D3B] uppercase">Transformation</span>
          </div>
          <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">Nos Réalisations</h2>
          <p className="text-gray-500 italic">Le bois redonne vie à vos espaces</p>
          <div className="w-16 h-1 bg-[#A66D3B] mx-auto mt-6"></div>
        </div>

        {/* Grille Avant/Après */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Colonne AVANT */}
          <div className="group">
            <div className="relative h-80 lg:h-[450px] w-full bg-white rounded-2xl overflow-hidden shadow-inner border border-[#A66D3B]/20">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-1 rounded-full shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">État initial</span>
              </div>
              
              {/* Placeholder ou Image */}
              <div className="flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-500">
                <ImagePlus className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm font-medium italic">Photo de l'ancien espace</p>
                {/* <Image src="/avant.jpg" alt="Avant" fill className="object-cover" /> */}
              </div>
            </div>
            <h3 className="mt-6 text-center text-xl font-serif italic  ">Avant</h3>
          </div>

          {/* Colonne APRÈS */}
          <div className="group">
            <div className="relative h-80 lg:h-[450px] w-full bg-[#F4EFEA] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#A66D3B]/20">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#A66D3B] px-4 py-1 rounded-full shadow-md">
                <span className="text-xs font-bold uppercase tracking-widest text-white">Après Travaux</span>
              </div>
              
              {/* Placeholder ou Image */}
              <div className="flex flex-col items-center justify-center h-full text-[#A66D3B] group-hover:scale-105 transition-transform duration-500">
                <ImagePlus className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium italic">Le résultat final</p>
                {/* <Image src="/apres.jpg" alt="Après" fill className="object-cover" /> */}
              </div>
            </div>
            <h3 className="mt-6 text-center text-xl font-serif font-bold text-[#2D2D2D]">Après</h3>
          </div>

        </div>

        {/* Note de bas de section */}
        <p className="text-center mt-16 text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Chaque projet est une collaboration unique. Nous travaillons le bois pour qu'il s'adapte à votre histoire.
        </p>
      </div>
    </section>
  );
}