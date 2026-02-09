"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion"; // Import de framer-motion

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  // Variantes d'animation pour les textes
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2 // Délai entre chaque ligne de texte
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="relative py-20 px-6 bg-[#F4EFEA] overflow-hidden">
      {/* Texture de fond */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('/votre-texture-papier.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte à gauche avec animation de groupe */}
          <motion.div 
            className={`space-y-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className={`flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
                {t('title')}
              </span>
              <div className="w-10 h-[1px] bg-gray-400"></div>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-medium text-[#2D2D2D] leading-tight"
            >
              {t('heading')}<br /> 
              <span className="italic">{t('subheading')}</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-md"
            >
              {t('description')}
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href={`/${locale}/a-propos`}>
                <button className="group flex items-center gap-2 bg-[#A66D3B] hover:bg-white text-white hover:text-black px-8 py-3.5 rounded-sm transition-all duration-300 shadow-md mt-4 border border-transparent hover:border-[#A66D3B]">
                  <span className="text-sm font-semibold uppercase tracking-widest">
                    {t('cta')}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image à droite avec animation de zoom/fade */}
          <motion.div 
            className={`relative h-[400px] md:h-[500px] w-full ${locale === 'ar' ? 'lg:order-first' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-sm">
              <Image
                src="/Gemini_Generated_Image_6hh7cn6hh7cn6hh7.png"
                alt={t('imageAlt')}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Élément de décoration animé */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#A66D3B]/20 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}