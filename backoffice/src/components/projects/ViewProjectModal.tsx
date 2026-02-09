import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, User, Image as ImageIcon } from 'lucide-react';
import {type Project } from '../../types/project';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ViewProjectModal: React.FC<Props> = ({ isOpen, onClose, project }) => {
  if (!project) return null;


  console.log("les projet",project)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#FDFBF9] rounded-3xl shadow-2xl overflow-hidden overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Hero Image */}
            <div className="relative h-[40vh] w-full">
              <img 
                src={project.cover_url || undefined} 
                className="w-full h-full object-cover"
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF9] via-transparent to-black/30" />
              <div className="absolute bottom-6 left-8">
                <h2 className="text-4xl font-serif italic text-[#2D2D2D]">{project.title}</h2>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F4EFEA] rounded-xl text-[#A66D3B]"><Tag size={20} /></div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">Catégorie</p>
                      <p className="font-bold text-[#2D2D2D]">{project.category?.name || 'Non classé'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F4EFEA] rounded-xl text-[#A66D3B]"><User size={20} /></div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">Client</p>
                      <p className="font-bold text-[#2D2D2D]">{project.client || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line font-light text-lg">
                    {project.description || "Aucune description disponible pour ce projet."}
                  </p>
                </div>
              </div>

              {/* Secondary Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-16">
                  <div className="flex items-center gap-2 mb-8">
                    <ImageIcon className="text-[#A66D3B]" size={20} />
                    <h3 className="text-xl font-serif italic text-[#2D2D2D]">Galerie du projet</h3>
                  </div>
                  <div className="columns-1 md:columns-2 gap-4 space-y-4">
                    {project.images.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img.url}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="rounded-2xl   shadow-sm hover:shadow-md transition-shadow"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewProjectModal;