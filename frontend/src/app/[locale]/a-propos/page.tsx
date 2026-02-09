"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Hammer, ShieldCheck, TreeDeciduous } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion,Variant,type Variants } from "framer-motion";

export default function AboutDetailPage() {
  const t = useTranslations('aboutd');
  const locale = useLocale();

  // Animation pour les cartes de valeurs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className="min-h-screen bg-[#F4EFEA] overflow-x-hidden">
      {/* Header simple avec bouton retour */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <Link 
          href={`/${locale}`}
          className={`inline-flex items-center text-[#A66D3B] group transition-all font-semibold uppercase text-xs tracking-widest ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          <span className="mx-2">{t('back')}</span>
        </Link>
      </motion.div>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${locale === 'ar' ? 'rtl' : ''}`}>
          
          {/* Section Image & Citation */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/props-bois.jpg" 
                alt={t('imageAlt')}
                fill 
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#A66D3B] p-8 rounded-2xl text-white italic text-xl font-serif text-center shadow-lg"
            >
              "{t('quote')}"
            </motion.div>
          </div>

          {/* Contenu textuel détaillé */}
          <div className="space-y-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-4"
            >
              <h1 className="text-5xl font-serif text-[#2D2D2D]">
                {t('title')}
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-[#A66D3B]"
              ></motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6 text-gray-700 leading-relaxed text-lg"
            >
              <p>{t('story.part1')}</p>
              <p>{t('story.part2')}</p>
            </motion.div>

            {/* Nos Valeurs avec Stagger Effect */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: Hammer, title: t('values.precision.title'), desc: t('values.precision.description') },
                { icon: TreeDeciduous, title: t('values.durability.title'), desc: t('values.durability.description') },
                { icon: ShieldCheck, title: t('values.warranty.title'), desc: t('values.warranty.description') }
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-[#E5D6C8] transition-shadow hover:shadow-md"
                >
                  <val.icon className="text-[#A66D3B] mb-4 w-8 h-8" />
                  <h4 className="font-bold text-[#2D2D2D] mb-2">{val.title}</h4>
                  <p className="text-sm text-gray-500">{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Bouton d'action final */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <Link 
                href={`/${locale}/demande-devis`}
                className="block text-center bg-[#2D2D2D] text-white py-5 rounded-lg font-bold uppercase tracking-[0.2em] hover:bg-[#A66D3B] transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                {t('cta')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}