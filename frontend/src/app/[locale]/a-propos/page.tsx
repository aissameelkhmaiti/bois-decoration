"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Hammer, ShieldCheck, TreeDeciduous } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function AboutDetailPage() {
  const t = useTranslations('aboutd');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-[#F4EFEA]">
      {/* Header simple avec bouton retour */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link 
          href={`/${locale}`}
          className={`inline-flex items-center text-[#A66D3B] hover:gap-2 transition-all font-semibold uppercase text-xs tracking-widest ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          {locale === 'ar' ? (
            <>
              <span>{t('back')}</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </>
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>{t('back')}</span>
            </>
          )}
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${locale === 'ar' ? 'rtl' : ''}`}>
          
          {/* Section Image & Citation */}
          <div className="space-y-8">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/props-bois.jpg" // Remplacez par une image de votre atelier
                alt={t('imageAlt')}
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-[#A66D3B] p-8 rounded-2xl text-white italic text-xl font-serif text-center">
              "{t('quote')}"
            </div>
          </div>

          {/* Contenu textuel détaillé */}
          <div className="space-y-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="space-y-4">
              <h1 className="text-5xl font-serif text-[#2D2D2D]">
                {t('title')}
              </h1>
              <div className="w-20 h-1 bg-[#A66D3B]"></div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                {t('story.part1')}
              </p>
              <p>
                {t('story.part2')}
              </p>
            </div>

            {/* Nos Valeurs sous forme d'icônes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {/* Valeur 1 : Précision */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <Hammer className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">
                  {t('values.precision.title')}
                </h4>
                <p className="text-sm text-gray-500">
                  {t('values.precision.description')}
                </p>
              </div>

              {/* Valeur 2 : Durabilité */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <TreeDeciduous className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">
                  {t('values.durability.title')}
                </h4>
                <p className="text-sm text-gray-500">
                  {t('values.durability.description')}
                </p>
              </div>

              {/* Valeur 3 : Garantie */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] hover:-translate-y-1 transition-all duration-300">
                <ShieldCheck className="text-[#A66D3B] mb-4 w-8 h-8" />
                <h4 className="font-bold text-[#2D2D2D] mb-2">
                  {t('values.warranty.title')}
                </h4>
                <p className="text-sm text-gray-500">
                  {t('values.warranty.description')}
                </p>
              </div>
            </div>

            {/* Bouton d'action final */}
            <div className="pt-8">
              <Link 
                href={`/${locale}/demande-devis`}
                className={`block text-center bg-[#2D2D2D] text-white py-5 rounded-lg font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xl ${locale === 'ar' ? 'text-center' : 'text-center'}`}
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}