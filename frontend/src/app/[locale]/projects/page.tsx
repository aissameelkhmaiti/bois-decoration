"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, Sun, Ruler, Hammer, LayoutGrid, Loader2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Link from 'next/link';

// Types
interface Category {
  id: number | string;
  name: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  cover_url: string;
  category_id: number | string;
}

export default function GaleriePage() {
  const t = useTranslations('gallery');
  const locale = useLocale();

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | number>('all');
  const [loading, setLoading] = useState(true);

  // --- ÉTATS DE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/categories/front`);
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data.data);
      } catch (error) {
        console.error("Erreur chargement catégories", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Charger les projets avec pagination
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const baseUrl = `http://localhost:8000/api/projects/front`;
        // Ajout du paramètre page et category_id
        let url = `${baseUrl}?page=${currentPage}`;
        if (activeCategory !== 'all') {
          url += `&category_id=${activeCategory}`;
        }
        
        const response = await fetch(url);
        const result = await response.json();
        
        setProjects(result.data || []); 
        setTotalPages(result.last_page || 1);
      } catch (error) {
        console.error("Erreur chargement projets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeCategory, currentPage]);

  // Reset de la page quand on change de catégorie
  const handleCategoryChange = (id: string | number) => {
    setActiveCategory(id);
    setCurrentPage(1);
  };

  const getIcon = (slug: string, isActive: boolean) => {
    const className = `w-6 h-6 transition-transform duration-500 ${isActive ? 'scale-110 rotate-12' : ''}`;
    switch(slug) {
      case 'interior-decoration': return <Paintbrush className={className} />;
      case 'exterior-layout': return <Sun className={className} />;
      case 'stairs-wardrobes': return <Ruler className={className} />;
      case 'wood-renovation': return <Hammer className={className} />;
      default: return <LayoutGrid className={className} />;
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header avec bouton retour */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href={`/${locale}`} className={`inline-flex items-center text-[#A66D3B] group transition-all font-semibold uppercase text-xs tracking-widest ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <ArrowLeft className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
            <span className="mx-2">{t('back') || 'Retour'}</span>
          </Link>
        </motion.div>

        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-serif text-[#2D2D2D] mb-4 italic">
            {t('title') || 'Nos Réalisations'}
          </motion.h1>
          <div className="w-24 h-1 bg-[#A66D3B] mx-auto mb-6"></div>
        </div>

        {/* Navigation par Catégories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-500 ${activeCategory === 'all' ? 'border-[#A66D3B] bg-white shadow-xl shadow-orange-900/5 -translate-y-2' : 'border-transparent bg-[#F4EFEA]/50 hover:bg-white hover:border-gray-200'}`}
          >
            <div className={`mb-4 p-4 rounded-2xl transition-all duration-500 ${activeCategory === 'all' ? 'bg-[#A66D3B] text-white shadow-lg' : 'bg-white text-[#A66D3B]'}`}>
              {getIcon('all', activeCategory === 'all')}
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${activeCategory === 'all' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>
              {t('all') || 'Tous'}
            </span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all duration-500 ${activeCategory === cat.id ? 'border-[#A66D3B] bg-white shadow-xl shadow-orange-900/5 -translate-y-2' : 'border-transparent bg-[#F4EFEA]/50 hover:bg-white hover:border-gray-200'}`}
            >
              <div className={`mb-4 p-4 rounded-2xl transition-all duration-500 ${activeCategory === cat.id ? 'bg-[#A66D3B] text-white shadow-lg' : 'bg-white text-[#A66D3B]'}`}>
                {getIcon(cat.slug, activeCategory === cat.id)}
              </div>
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] text-center ${activeCategory === cat.id ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* --- PAGINATION EN HAUT --- */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-2">
            Page <span className="text-[#A66D3B]">{currentPage}</span> sur {totalPages}
          </p>
          
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-xl border border-gray-200 disabled:opacity-30 hover:border-[#A66D3B] hover:text-[#A66D3B] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#A66D3B] text-white shadow-lg shadow-[#A66D3B]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-xl border border-gray-200 disabled:opacity-30 hover:border-[#A66D3B] hover:text-[#A66D3B] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grille de Projets */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode='wait'>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-[#FDFBF9]/80 z-10">
                <Loader2 className="w-10 h-10 animate-spin text-[#A66D3B] mb-4" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {projects.map((project) => (
                <Link key={project.id} href={`/${locale}/projects/${project.id}`} className="block group">
                  <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative h-[450px] overflow-hidden rounded-[2rem] shadow-sm bg-white">
                    <img src={project.cover_url || "/api/placeholder/400/320"} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-10">
                      <span className="text-[#A66D3B] text-[10px] font-black uppercase tracking-[0.3em] mb-3">{categories.find(c => String(c.id) === String(project.category_id))?.name}</span>
                      <h3 className="text-white text-2xl font-serif italic">{project.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {!loading && projects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-gray-400 font-serif italic text-lg">Aucune réalisation ici.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}