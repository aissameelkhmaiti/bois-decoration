import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  ChevronDown, 
  Mail, 
  Home, 
  Sun, 
  Armchair, 
  FileText 
} from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section className="relative h-screen px-4 overflow-hidden">
        {/* Image de fond */}
        <Image
          src="/ChatGPT Image 5 févr. 2026, 22_03_12.png"
          alt="Bois décoration maison"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* --- NOUVELLE BARRE DE NAVIGATION --- */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image 
                src="/decor maison.png" 
                alt="Logo" 
                fill 
                className="object-contain filter rounded-xl" 
              />
            </div>
            <h1 className="text-white   mx-2 duration-300   font-semibold uppercase tracking-wider">Aji Decory</h1>
          </div>

          {/* Boutons à droite */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <button className="flex items-center space-x-2 text-white border border-white/30 px-3 py-1.5 rounded-full hover:bg-white/10 transition text-sm font-medium">
              <Globe className="h-4 w-4" />
              <span>FR</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>

            {/* Bouton Contact */}
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/50 px-5 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm font-semibold uppercase tracking-wider">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </div>
        </nav>

        {/* Contenu Central */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="h-[1px] w-8 md:w-12 bg-white/50"></div>
            <h2 className="font-script text-2xl md:text-3xl text-white italic tracking-wide">
              Création sur mesure en bois
            </h2>
            <div className="h-[1px] w-8 md:w-12 bg-white/50"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
            Sublimez Votre Intérieur
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
            & Extérieur en Bois
          </h1>

<Link href="/demande-devis" className="inline-block">
  <button className="group flex items-center space-x-3 bg-[#A66D3B] hover:bg-[#8B5A2B] text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl transition-all duration-300 hover:scale-105 uppercase tracking-widest">
    <span>Demander un Devis</span>
    <FileText className="h-5 w-5 transition-transform group-hover:rotate-12" />
  </button>
</Link>
        </div>
      </section>

      {/* Bande Services */}
      <div className="relative z-10 -mt-16 w-full max-w-5xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md border border-[#E5D6C8] rounded-3xl shadow-lg px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5D6C8]">
            
            {/* Item 1 */}
            <div className="flex items-center justify-center gap-4 py-4 hover:bg-[#A66D3B]/5 transition-colors rounded-t-3xl md:rounded-none">
              <Home className="text-[#8B5A2B] h-8 w-8" />
              <span className="text-[#8B5A2B] font-semibold">
                Aménagement Intérieur
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-center gap-4 py-4 hover:bg-[#A66D3B]/5 transition-colors">
              <Sun className="text-[#8B5A2B] h-8 w-8" />
              <span className="text-[#8B5A2B] font-semibold">
                Terrasses & Pergolas
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-center gap-4 py-4 hover:bg-[#A66D3B]/5 transition-colors rounded-b-3xl md:rounded-none">
              <Armchair className="text-[#8B5A2B] h-8 w-8" />
              <span className="text-[#8B5A2B] font-semibold">
                Mobilier sur Mesure
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}