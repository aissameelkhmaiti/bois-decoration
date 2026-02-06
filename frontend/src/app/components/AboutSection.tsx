import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-6 bg-[#F4EFEA]">
      {/* Texture de fond subtile (optionnelle si vous avez l'image de texture) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('/votre-texture-papier.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte à gauche */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
                À propos de nous
              </span>
              <div className="w-10 h-[1px] bg-gray-400"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2D2D2D] leading-tight">
              Artisans du Bois,<br /> 
              <span className="italic">Passion & Savoir-Faire</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-md">
              Des créations uniques pour un intérieur chaleureux et naturel.
            </p>

            {/* Modification du bouton en Link */}
            <Link href="/a-propos">
              <button className="group flex items-center gap-2 bg-[#A66D3B] text-white px-8 py-3.5 rounded-sm hover:bg-[#8B5A2B] transition-all shadow-md mt-4">
                <span className="text-sm font-semibold uppercase tracking-widest">
                  En savoir plus
                </span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          {/* Image avec effet de découpe à droite */}
          <div className="relative h-[400px] md:h-[500px] w-full">
            <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-sm">
              <Image
                src="/artisan-bois.png" // Remplacez par votre image de l'artisan
                alt="Artisan travaillant le bois"
                fill
                className="object-cover"
              />
              
               
               
            </div>
            
            {/* Petit élément de décoration (texture bois qui dépasse) */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#A66D3B]/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}