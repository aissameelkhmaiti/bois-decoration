"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section id="about" className="relative py-20 px-6 bg-[#F4EFEA]">
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('/votre-texture-papier.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte à gauche */}
          <div className={`space-y-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
                {t('title')}
              </span>
              <div className="w-10 h-[1px] bg-gray-400"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2D2D2D] leading-tight">
              {t('heading')}<br /> 
              <span className="italic">{t('subheading')}</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-md">
              {t('description')}
            </p>

            {/* Lien vers la page À propos */}
            <Link href={`/${locale}/a-propos`}>
              <button className="group flex items-center gap-2 bg-[#A66D3B] hover:bg-[#FFFFFF] text-white hover:text-black px-8 py-3.5 rounded-sm hover:bg-[#8B5A2B] transition-all shadow-md mt-4">
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {t('cta')}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </Link>
          </div>

          {/* Image avec effet de découpe à droite */}
          <div className={`relative h-[400px] md:h-[500px] w-full ${locale === 'ar' ? 'lg:order-first' : ''}`}>
            <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-sm">
              <Image
                src="/Gemini_Generated_Image_6hh7cn6hh7cn6hh7.png"
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Petit élément de décoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#A66D3B]/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}