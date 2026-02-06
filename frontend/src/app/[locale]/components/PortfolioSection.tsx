"use client";

import Image from "next/image";
import { ImagePlus, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const locale = useLocale();

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className={`text-center mb-16 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center justify-center gap-2 mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="text-[#A66D3B] w-5 h-5" />
            <span className="text-sm font-bold tracking-[0.3em] text-[#A66D3B] uppercase">
              {t('sectionTitle')}
            </span>
          </div>
          <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-500 italic">
            {t('subtitle')}
          </p>
          <div className="w-16 h-1 bg-[#A66D3B] mx-auto mt-6"></div>
        </div>

        {/* Grille Avant/Après */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Colonne AVANT */}
          <div className="group">
            <div className="relative h-80 lg:h-[450px] w-full bg-white rounded-2xl overflow-hidden shadow-inner border border-[#A66D3B]/20">
              {/* Badge */}
              <div className={`absolute top-4 z-10 bg-white/90 backdrop-blur px-4 py-1 rounded-full shadow-sm ${locale === 'ar' ? 'right-4' : 'left-4'}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {t('before.label')}
                </span>
              </div>
              
              {/* Placeholder ou Image */}
              <div className="flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-500">
                <ImagePlus className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm font-medium italic">
                  {t('before.placeholder')}
                </p>
                {/* Si vous avez une image : */}
                {/* <Image 
                  src={`/images/${locale}/portfolio/avant.jpg`} 
                  alt={t('before.alt')} 
                  fill 
                  className="object-cover" 
                /> */}
              </div>
            </div>
            <h3 className={`mt-6 text-center text-xl font-serif italic ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('before.title')}
            </h3>
          </div>

          {/* Colonne APRÈS */}
          <div className="group">
            <div className="relative h-80 lg:h-[450px] w-full bg-[#F4EFEA] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#A66D3B]/20">
              {/* Badge */}
              <div className={`absolute top-4 z-10 bg-[#A66D3B] px-4 py-1 rounded-full shadow-md ${locale === 'ar' ? 'right-4' : 'left-4'}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {t('after.label')}
                </span>
              </div>
              
              {/* Placeholder ou Image */}
              <div className="flex flex-col items-center justify-center h-full text-[#A66D3B] group-hover:scale-105 transition-transform duration-500">
                <ImagePlus className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium italic">
                  {t('after.placeholder')}
                </p>
                {/* Si vous avez une image : */}
                {/* <Image 
                  src={`/images/${locale}/portfolio/apres.jpg`} 
                  alt={t('after.alt')} 
                  fill 
                  className="object-cover" 
                /> */}
              </div>
            </div>
            <h3 className={`mt-6 text-center text-xl font-serif font-bold text-[#2D2D2D] ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('after.title')}
            </h3>
          </div>

        </div>

        {/* Note de bas de section */}
        <p className={`text-center mt-16 text-gray-400 text-sm max-w-md mx-auto leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {t('footerNote')}
        </p>
      </div>
    </section>
  );
}