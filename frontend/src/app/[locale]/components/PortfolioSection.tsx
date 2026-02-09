"use client";

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, LayoutGrid, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  cover_url: string;
  category?: { name: string };
}

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les 3 ou 4 derniers projets
  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projects/front`);
        const data = await response.json();
        // On ne prend que les 3 derniers pour la landing page
        setProjects(data.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Erreur chargement projets landing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProjects();
  }, []);

  const isRTL = locale === 'ar';

  return (
    <section id="portfolio" className="py-24 px-6 overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-[1px] bg-[#A66D3B]"></div>
              <span className="text-sm font-bold tracking-[0.3em] text-[#A66D3B] uppercase">
                {t('sectionTitle')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2D2D2D]">
              {t('heading')}
            </h2>
          </motion.div>

          <Link href={`/${locale}/projects`}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-[#A66D3B] text-white hover:bg-white hover:text-[#A66D3B] hover:border-[#A66D3B] border border-transparent px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-900/20"
            >
              {t('viewAll')}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.button>
          </Link>
        </div>

        {/* Grille des derniers projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Squelettes de chargement
            [1, 2, 3].map((n) => (
              <div key={n} className="h-[450px] bg-gray-100 animate-pulse rounded-[2rem]" />
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-gray-200/50"
              >
                {/* Image de fond */}
                <img 
                  src={project.cover_url} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay dégradé */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Contenu de la carte */}
                <div className={`absolute inset-0 p-10 flex flex-col justify-end ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-[#A66D3B] text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                    {project.category?.name || "Réalisation"}
                  </span>
                  <h3 className="text-white text-2xl font-serif italic mb-6">
                    {project.title}
                  </h3>
                  
                  <Link href={`/${locale}/projects/${project.id}`}>
                    <div className={`inline-flex items-center gap-2 text-white/70 group-hover:text-white transition-colors text-xs uppercase tracking-widest border-b border-white/20 pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {t('discoverProject')}
                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Si aucun projet */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <LayoutGrid className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-serif italic">{t('noProjects')}</p>
          </div>
        )}

      </div>
    </section>
  );
}