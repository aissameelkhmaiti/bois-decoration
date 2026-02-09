"use client";

import { useState, useEffect, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion"; // Import indispensable

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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
        {/* Animation de l'image de fond (Zoom lent) */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/ChatGPT Image 5 févr. 2026, 22_03_12.png"
            alt="Bois décoration maison"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/50"></div>

        {/* Nav avec apparition douce */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 md:px-12 md:py-6"
        >
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
            <h1 className="text-white ml-2 text-sm md:text-base font-semibold uppercase tracking-wider hidden sm:block">
              {t('nav.title')}
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-[#A66D3B] text-white border border-white/30 px-2 py-1.5 md:px-3 rounded-full transition text-xs md:text-sm font-medium"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl z-50"
                  >
                    {locales.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full text-left px-4 py-3 md:py-2 text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white first:rounded-t-lg last:rounded-b-lg border-b last:border-none ${
                          locale === lang ? 'bg-gray-50 font-bold text-[#A66D3B]' : ''
                        }`}
                      >
                        {lang === 'fr' && 'Français'}
                        {lang === 'en' && 'English'}
                        {lang === 'ar' && 'العربية'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/50 px-5 py-2 rounded-lg hover:bg-[#A66D3B] transition-all duration-300 text-sm font-semibold uppercase tracking-wider">
              <Phone className="h-4 w-4" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>
        </motion.nav>

        {/* Contenu Central avec effet de cascade */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-6 md:w-12 bg-white/50"></div>
            <h2 className="font-script text-xl md:text-3xl text-white italic tracking-wide">
              {t('hero.subtitle')}
            </h2>
            <div className="h-[1px] w-6 md:w-12 bg-white/50"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 leading-tight"
          >
            {t('hero.title1')}
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight"
          >
            {t('hero.title2')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href={`/${locale}/demande-devis`} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group flex items-center justify-center space-x-3 bg-[#A66D3B] hover:bg-white text-white hover:text-black font-bold py-3 px-8 md:py-4 md:px-10 rounded-lg text-base md:text-lg shadow-xl transition-all hover:scale-105 uppercase tracking-widest">
                <span>{t('hero.cta')}</span>
                <FileText className="h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bande Services - Apparition par le bas */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 -mt-10 md:-mt-16 w-full max-w-5xl mx-auto px-4 mb-10"
      >
        <div className="bg-white/95 backdrop-blur-md border border-[#E5D6C8] rounded-2xl md:rounded-3xl shadow-lg p-2 md:px-6 md:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D6C8]">
            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors cursor-pointer group">
              <Home className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">{t('service.interior')}</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors cursor-pointer group">
              <Sun className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">{t('service.terrace')}</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-4 hover:bg-[#A66D3B]/5 transition-colors cursor-pointer group">
              <Armchair className="text-[#8B5A2B] h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
              <span className="text-[#8B5A2B] font-semibold text-sm md:text-base">{t('service.furniture')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}