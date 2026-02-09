"use client";

import Link from 'next/link';
import { Paintbrush, Sun, Ruler, Hammer, Image as ImageIcon, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion,type Variants } from "framer-motion"; // Importation de Framer Motion

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    {
      id: 'interior-decoration',
      title: t('services.interior.title'),
      description: t('services.interior.description'),
      icon: 'Paintbrush'
    },
    {
      id: 'exterior-layout',
      title: t('services.exterior.title'),
      description: t('services.exterior.description'),
      icon: 'Sun'
    },
    {
      id: 'stairs-wardrobes',
      title: t('services.stairs.title'),
      description: t('services.stairs.description'),
      icon: 'Ruler'
    },
    {
      id: 'wood-renovation',
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
      icon: 'Hammer'
    }
  ];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Paintbrush': return <Paintbrush className="w-8 h-8" />;
      case 'Sun': return <Sun className="w-8 h-8" />;
      case 'Ruler': return <Ruler className="w-8 h-8" />;
      case 'Hammer': return <Hammer className="w-8 h-8" />;
      default: return null;
    }
  };

  // Variantes pour l'apparition de la grille
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Les cartes apparaissent les unes après les autres
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="services" className="py-24 px-6 bg-[#F4EFEA]">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec animation Fade-In */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <div className="max-w-xl">
            <div className={`flex items-center gap-3 mb-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-[1px] bg-[#A66D3B]"></div>
              <span className="text-sm font-bold tracking-widest text-[#A66D3B] uppercase">
                {t('sectionTitle')}
              </span>
            </div>
            <h2 className="text-4xl font-serif text-[#2D2D2D] leading-tight">
              {t('heading.line1')}<br />
              <span className="italic">{t('heading.line2')}</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-xs pb-1">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grille des services animée */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="group bg-white/50 backdrop-blur-sm border border-[#E5D6C8] p-8 rounded-xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-[#A66D3B] mb-6 inline-block p-3 bg-[#F4EFEA] rounded-lg group-hover:bg-[#A66D3B] group-hover:text-white transition-colors duration-300">
                {getIcon(service.icon)}
              </div>
              
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <Link 
                href={`/${locale}/services/${service.id}`}
                className="group/link inline-flex items-center text-[#A66D3B] font-bold text-xs uppercase tracking-widest"
              >
                {t('serviceLink')}
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover/link:-translate-x-1' : 'group-hover/link:translate-x-1'}`} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bouton Galerie avec animation de remontée */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link 
            href={`/${locale}/projects`}
            className={`group flex items-center gap-3 bg-[#2D2D2D] hover:bg-white text-white hover:text-black border border-transparent hover:border-[#2D2D2D] py-4 px-10 rounded-sm transition-all shadow-lg ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <ImageIcon className="w-5 h-5 text-[#A66D3B]" />
            <span className="font-semibold uppercase tracking-[0.2em] text-sm">
              {t('galleryLink')}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}