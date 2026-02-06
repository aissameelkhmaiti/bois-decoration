// app/[locale]/services/[id]/page.tsx
"use client";

import { Paintbrush, Sun, Ruler, Hammer, CheckCircle, ChevronLeft } from "lucide-react";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { use } from 'react'; // ← IMPORTANT: Importer use depuis React

// Données des services
const SERVICES_DATA = [
  {
    id: 'interior-decoration',
    icon: 'Paintbrush',
    image: '/interior-decoration.png',
  },
  {
    id: 'exterior-layout',
    icon: 'Sun',
    image: '/exterior-layout.png',
  },
  {
    id: 'stairs-wardrobes',
    icon: 'Ruler',
    image: '/stairs-wardrobes.png',
  },
  {
    id: 'wood-renovation',
    icon: 'Hammer',
    image: '/wood-renovation.png',
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

// Page de détail des services
export default function ServiceDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  //  CORRECTION: Utiliser React.use() pour déballer la Promise
  const { id, locale } = use(params);
  
  const t = useTranslations(`servicest.details.${id}`); // Note: corrigé "servicest" → "services"
  const tCommon = useTranslations('common');
  const currentLocale = useLocale();

  const service = SERVICES_DATA.find((s) => s.id === id);

  if (!service || !t('title')) {
    notFound();
  }

  // Récupérer les caractéristiques traduites
  const features = Array.from({ length: 6 }, (_, i) => t(`features.${i}`)).filter(f => f);

  return (
    <main className="min-h-screen bg-[#F4EFEA] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Lien de retour */}
        <Link 
          href={`/${currentLocale}/#services`} 
          className={`inline-flex items-center text-[#A66D3B] mb-12 hover:gap-2 transition-all font-bold uppercase text-xs tracking-widest ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          {locale === 'ar' ? (
            <>
              <span>{tCommon('backToServices')}</span>
              <ChevronLeft className="w-4 h-4 mr-2 rotate-180" />
            </>
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>{tCommon('backToServices')}</span>
            </>
          )}
        </Link>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${locale === 'ar' ? 'rtl' : ''}`}>
          {/* Image du service */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <Image 
              src={service.image} 
              alt={t('title')}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Contenu du service */}
          <div className="space-y-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {/* Titre et icône */}
            <div className={`flex items-center gap-4 text-[#A66D3B] ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {getIcon(service.icon)}
              </div>
              <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">
                {t('title')}
              </h1>
            </div>

            {/* Description complète */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('fullDescription')}
            </p>

            {/* Caractéristiques */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">
                {t('featuresTitle')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className={`flex items-center gap-2 text-gray-700 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-[#A66D3B]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton de devis */}
            <div className="pt-8">
              <Link 
                href={`/${currentLocale}/demande-devis`}
                className={`block text-center bg-[#A66D3B] hover:bg-[#FFFFFF] text-white hover:text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8B5A2B] transition-colors shadow-lg ${locale === 'ar' ? 'text-center' : 'text-center'}`}
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}