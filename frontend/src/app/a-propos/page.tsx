import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Hammer, ShieldCheck, TreeDeciduous } from "lucide-react";

export default function AboutDetailPage() {
  return (
    <main className="min-h-screen bg-[#F4EFEA]">
      {/* Header simple avec bouton retour */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center text-[#A66D3B] hover:gap-2 transition-all font-semibold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Section Image & Citation */}
          <div className="space-y-8">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl  ">
              <Image 
                src="/props-bois.jpg" // Remplacez par une image de votre atelier
                alt="Notre Atelier" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="bg-[#A66D3B] p-8 rounded-2xl text-white italic text-xl font-serif">
              "Le bois n'est pas seulement un matériau, c'est une âme que nous sculptons pour votre foyer."
            </div>
          </div>

          {/* Contenu textuel détaillé */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl font-serif text-[#2D2D2D]">Notre Histoire</h1>
              <div className="w-20 h-1 bg-[#A66D3B]"></div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                Depuis plus de 10 ans, <strong>Aji Decory</strong> s'est imposé comme une référence de la menuiserie artisanale à Casablanca. Notre aventure a commencé dans un petit atelier, guidée par une seule obsession : la perfection du trait et le respect de la fibre.
              </p>
              <p>
                Nous sélectionnons nos essences de bois avec une rigueur absolue, privilégiant des sources durables pour garantir non seulement la beauté, mais aussi la longévité de chaque pièce qui sort de notre atelier.
              </p>
            </div>

            {/* Nos Valeurs sous forme d'icônes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 ">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <Hammer className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">Précision</h4>
                <p className="text-sm text-gray-500">Un travail millimétré pour des finitions impeccables.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <TreeDeciduous className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">Durabilité</h4>
                <p className="text-sm text-gray-500">Des bois nobles choisis pour durer plusieurs générations.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <ShieldCheck className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">Garantie</h4>
                <p className="text-sm text-gray-500">Un suivi après-vente et une garantie sur nos structures.</p>
              </div>
            </div>

            {/* Bouton d'action final */}
            <div className="pt-8">
              <Link href="/demande-devis" className="block text-center bg-[#2D2D2D] text-white py-5 rounded-lg font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xl">
                Démarrer un projet avec nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}