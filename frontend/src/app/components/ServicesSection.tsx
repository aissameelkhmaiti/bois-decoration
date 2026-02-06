// ServicesSection.tsx
import Link from 'next/link';
import { Paintbrush, Sun, Ruler, Hammer, Image as ImageIcon, ChevronRight } from "lucide-react";

const services = [
  {
    id: 'interior-decoration',
    title: 'Décoration Intérieure',
    description: 'Créations sur mesure pour embellir votre intérieur avec élégance.',
    icon: 'Paintbrush'
  },
  {
    id: 'exterior-layout',
    title: 'Aménagement Extérieur',
    description: 'Terrasses, pergolas et structures bois pour vos jardins.',
    icon: 'Sun'
  },
  {
    id: 'stairs-wardrobes',
    title: 'Escaliers & Placards',
    // Fixed: Escaped single quote
    description: "Optimisation d'espace et menuiserie de précision sur mesure.",
    icon: 'Ruler'
  },
  {
    id: 'wood-renovation',
    title: 'Rénovation Bois',
    description: 'Restauration de meubles anciens et remise à neuf de structures.',
    icon: 'Hammer'
  }
];

// Component logic remains the same, just updated the return with <Link>
export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#A66D3B]"></div>
              <span className="text-sm font-bold tracking-widest text-[#A66D3B] uppercase">Notre Expertise</span>
            </div>
            <h2 className="text-4xl font-serif text-[#2D2D2D] leading-tight">
              Des services artisanaux pour <br />
              <span className="italic">tous vos projets en bois</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-xs pb-1">
            Chaque pièce est travaillée à la main avec une attention particulière aux détails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white/50 backdrop-blur-sm border border-[#E5D6C8] p-8 rounded-xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-[#A66D3B] mb-6 inline-block p-3 bg-[#F4EFEA] rounded-lg group-hover:bg-[#A66D3B] group-hover:text-white transition-colors duration-300">
                {/* Reusing the logic from the page or placing getIcon here */}
                {service.icon === 'Paintbrush' && <Paintbrush className="w-8 h-8" />}
                {service.icon === 'Sun' && <Sun className="w-8 h-8" />}
                {service.icon === 'Ruler' && <Ruler className="w-8 h-8" />}
                {service.icon === 'Hammer' && <Hammer className="w-8 h-8" />}
              </div>
              
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <Link 
                href={`/services/${service.id}`}
                className="group/link inline-flex items-center text-[#A66D3B] font-bold text-xs uppercase tracking-widest"
              >
                Détails du service
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/galerie" 
            className="group flex items-center gap-3 bg-[#2D2D2D] hover:bg-[#1a1a1a] text-white py-4 px-10 rounded-sm transition-all shadow-lg"
          >
            <ImageIcon className="w-5 h-5 text-[#A66D3B]" />
            <span className="font-semibold uppercase tracking-[0.2em] text-sm">Découvrir la Galerie</span>
          </Link>
        </div>
      </div>
    </section>
  );
}