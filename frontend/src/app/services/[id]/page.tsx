// app/services/[id]/page.tsx
import { Paintbrush, Sun, Ruler, Hammer, CheckCircle, ChevronLeft } from "lucide-react";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const SERVICES_DATA = [
  {
    id: 'interior-decoration',
    title: 'Décoration Intérieure',
    description: 'Créations sur mesure pour embellir votre intérieur avec élégance.',
    icon: 'Paintbrush',
    image: '/interior-decoration.png',
    fullDescription: "Notre service de décoration intérieure transforme vos espaces de vie en véritables œuvres d'art. Nous créons des pièces uniques en bois massif qui s'intègrent parfaitement à votre style et vos besoins.",
    features: [
      'Mobilier sur mesure',
      'Bibliothèques murales',
      'Tables et chaises artisanales',
      'Éléments décoratifs en bois',
      'Conseils en aménagement',
      'Finitions personnalisées'
    ]
  },
  {
    id: 'exterior-layout',
    title: 'Aménagement Extérieur',
    description: 'Terrasses, pergolas et structures bois pour vos jardins.',
    icon: 'Sun',
    image: '/exterior-layout.png',
    fullDescription: 'Sublimez vos espaces extérieurs avec nos créations en bois résistant aux intempéries. Terrasses, pergolas, et mobilier de jardin conçus pour durer et embellir votre espace.',
    features: [
      'Terrasses en bois',
      'Pergolas et tonnelles',
      'Clôtures décoratives',
      'Mobilier de jardin',
      'Abris de jardin',
      'Bois traité autoclave'
    ]
  },
  {
    id: 'stairs-wardrobes',
    title: 'Escaliers & Placards',
    description: "Optimisation d'espace et menuiserie de précision sur mesure.", 
    icon: 'Ruler',
    image: '/stairs-wardrobes.png',
    fullDescription: "Expertise en menuiserie de précision pour escaliers sur mesure et solutions de rangement optimisées. Chaque projet est conçu pour maximiser l'espace disponible.",
    features: [
      'Escaliers sur mesure',
      'Garde-corps en bois',
      'Placards encastrés',
      'Dressings personnalisés',
      'Rangements sous pente',
      "Optimisation d'espace"
    ]
  },
  {
    id: 'wood-renovation',
    title: 'Rénovation Bois',
    description: 'Restauration de meubles anciens et remise à neuf de structures.',
    icon: 'Hammer',
    image: '/wood-renovation.png',
    fullDescription: 'Donnez une seconde vie à vos meubles et structures en bois. Notre expertise en restauration permet de préserver le charme de l\'ancien tout en assurant durabilité et fonctionnalité.',
    features: [
      'Restauration de meubles anciens',
      'Ponçage et vernissage',
      'Réparation de structures',
      'Traitement du bois',
      'Remplacement de pièces',
      'Finitions traditionnelles'
    ]
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    Paintbrush: <Paintbrush className="w-8 h-8" />,
    Sun: <Sun className="w-8 h-8" />,
    Ruler: <Ruler className="w-8 h-8" />,
    Hammer: <Hammer className="w-8 h-8" />
  };
  return icons[iconName as keyof typeof icons];
};

// Solution 1: Utiliser async/await (recommandé)
export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Déballer la Promise avec await
  const { id } = await params;
  const service = SERVICES_DATA.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F4EFEA] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/#services" className="inline-flex items-center text-[#A66D3B] mb-12 hover:gap-2 transition-all font-bold uppercase text-xs tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour aux services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10 z-10" />
          
             <Image 
              src={service.image} 
              alt={service.title}
              fill
              className="object-cover"
            />  
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 text-[#A66D3B]">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {getIcon(service.icon)}
              </div>
              <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">{service.title}</h1>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {service.fullDescription}
            </p>



            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">Ce que nous proposons :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#A66D3B]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link href="/demande-devis" className="block text-center bg-[#A66D3B] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8B5A2B] transition-colors shadow-lg">
                Demander un devis pour ce service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Solution alternative: Si vous préférez ne pas utiliser async/await
/*
import { use } from 'react';

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Déballer la Promise avec React.use()
  const { id } = use(params);
  const service = SERVICES_DATA.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  // ... reste du code
}
*/