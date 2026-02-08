"use client";

import { useState, useEffect, useRef } from "react"; // Ajout de hooks
import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  ChevronDown, 
  Phone,
  Home, 
  Sun, 
  Armchair, 
  FileText 
} from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  
  // État pour gérer l'ouverture du menu de langue sur mobile/desktop
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    const path = window.location.pathname;
    const newPath = path.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsLangOpen(false);
  };

  return (
    <>
      <section className="relative h-screen px-4 overflow-hidden">
        <Image
          src="/ChatGPT Image 5 févr. 2026, 22_03_12.png"
          alt="Bois décoration maison"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50"></div>

        {/* Navigation Responsive */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 md:px-12 md:py-6">
          <div className="flex items-center">
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Link href={`/${locale}`}>
                <Image 
                  src="/decor maison.png" 
                  alt="Logo" 
                  fill 
                  className="object-contain filter rounded-xl" 
                />
              </Link>
            </div>
            {/* Titre masqué sur très petits écrans pour gagner de la place */}
            <h1 className="text-white ml-2 text-sm md:text-base font-semibold uppercase tracking-wider hidden sm:block">
              {t('nav.title')}
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Sélecteur de langue avec gestion de clic */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-[#A66D3B] text-white border border-white/30 px-2 py-1.5 md:px-3 rounded-full   transition text-xs md:text-sm font-medium"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span> {/* Affiche 'FR' ou 'EN' pour gagner de la place */}
                <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown conditionnel */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl z-50 animate-in fade-in zoom-in duration-200">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-3 md:py-2 text-[#A66D3B]   hover:bg-[#A66D3B] hover:text-white first:rounded-t-lg last:rounded-b-lg border-b last:border-none ${
                        locale === lang ? 'bg-gray-50 font-bold text-[#A66D3B]' : ''
                      }`}
                    >
                      {lang === 'fr' && 'Français'}
                      {lang === 'en' && 'English'}
                      {lang === 'ar' && 'العربية'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton contact réduit sur mobile */}
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/50 px-5 py-2 rounded-lg hover:bg-[#A66D3B] transition-all duration-300 text-sm font-semibold uppercase tracking-wider">
              <Phone className="h-4 w-4" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>
        </nav>

        {/* Contenu Central Responsive */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[1px] w-6 md:w-12 bg-white/50"></div>
            <h2 className="font-script text-xl md:text-3xl text-white italic tracking-wide">
              {t('hero.subtitle')}
            </h2>
            <div className="h-[1px] w-6 md:w-12 bg-white/50"></div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
            {t('hero.title1')}
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight">
            {t('hero.title2')}
          </h1>

          <Link href={`/${locale}/demande-devis`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group flex items-center justify-center space-x-3 bg-[#A66D3B] hover:bg-white text-white hover:text-black font-bold py-3 px-8 md:py-4 md:px-10 rounded-lg text-base md:text-lg shadow-xl transition-all hover:scale-105 uppercase tracking-widest">
              <span>{t('hero.cta')}</span>
              <FileText className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Bande Services - Optimisée pour le scroll mobile */}
      <div className="relative z-10 -mt-10 md:-mt-16 w-full max-w-5xl mx-auto px-4 mb-10">
        <div className="bg-white/95 backdrop-blur-md border border-[#E5D6C8] rounded-2xl md:rounded-3xl shadow-lg p-2 md:px-6 md:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D6C8]">
            
            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors">
              <Home className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">
                {t('service.interior')}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors">
              <Sun className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">
                {t('service.terrace')}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors">
              <Armchair className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">
                {t('service.furniture')}
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}