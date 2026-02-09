"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// --- COMPOSANT SKELETON ---
const ProjectSkeleton = () => (
  <div className="min-h-screen bg-[#FDFBF9] animate-pulse">
    {/* Hero Skeleton */}
    <div className="relative h-[70vh] w-full bg-gray-200" />
    
    <div className="max-w-7xl mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-8">
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="mt-24 space-y-8">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="columns-1 md:columns-3 gap-6 space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-80 bg-gray-200 rounded-xl" />
          <div className="h-72 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

// --- COMPOSANT PRINCIPAL ---
interface ProjectImage {
  id: number;
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  cover_url: string;
  category: { name: string };
  images: ProjectImage[];
}

export default function ProjectDetail() {
  const { id, locale } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/projects/front/${id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Remplacement du "Chargement..." par le Skeleton
  if (loading) return <ProjectSkeleton />;
  
  if (!project) return (
    <div className="h-screen flex items-center justify-center font-serif italic text-gray-500">
      Projet non trouvé
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFBF9] pb-20">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={project.cover_url} 
          className="w-full h-full object-cover"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-white bg-gradient-to-t from-black/80 to-transparent">
          <Link href={`/${locale}/projects`} className="flex items-center gap-2 text-sm uppercase tracking-widest mb-4 hover:text-[#A66D3B] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour à la galerie
          </Link>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-serif italic"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-2 bg-[#F4EFEA] rounded-lg"><Tag className="w-5 h-5 text-[#A66D3B]" /></div>
                <div>
                  <p className="text-xs uppercase tracking-tighter text-gray-400">Catégorie</p>
                  <p className="font-bold">{project.category.name}</p>
                </div>
              </div>
              
              {project.client && (
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="p-2 bg-[#F4EFEA] rounded-lg"><User className="w-5 h-5 text-[#A66D3B]" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-tighter text-gray-400">Client</p>
                    <p className="font-bold">{project.client}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 text-lg text-gray-700 leading-relaxed font-light">
            <p className="whitespace-pre-line">{project.description}</p>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="mt-24 space-y-12">
          <h2 className="text-3xl font-serif italic text-[#2D2D2D]">Vues du projet</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {project.images.map((img, index) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={img.url} 
                  alt={`${project.title} detail ${index}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}