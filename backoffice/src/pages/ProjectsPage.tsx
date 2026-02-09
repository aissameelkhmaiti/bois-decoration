import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../redux/projectsSlice';
import type { RootState, AppDispatch } from '../redux/store';
import { type Project } from '../types/project';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Modals
import AddProjectModal from '../components/projects/AddProjectModel';
import EditProjectModal from '../components/projects/EditProjectModal';
import DeleteProjectModal from '../components/projects/Deleteprojectmodal';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const rowVariants = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } 
};

const ProjectsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Select from Redux state
  const { items, pagination, status } = useSelector((state: RootState) => state.projects);

  // Pagination and Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch Logic (with Debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchProjects({ page: currentPage, search: searchTerm }));
    }, 400);

    return () => clearTimeout(timer);
  }, [dispatch, currentPage, searchTerm]);

  // Modal Helpers
  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const totalPages = pagination?.last_page || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 3 }} 
          className="p-2 bg-[#A66D3B]/10 rounded-lg"
        >
          <ArchitectureIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </motion.div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Gestion des Projets</h1>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[350px] group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="text-[#8d6e63] group-focus-within:text-[#A66D3B] transition-colors" fontSize="small" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { 
              setSearchTerm(e.target.value); 
              setCurrentPage(1); // Reset to page 1 on new search
            }}
            placeholder="Rechercher un projet..."
            className="w-full bg-white border border-[#d7ccc8] text-sm rounded-xl focus:border-[#A66D3B] focus:outline-none block pl-10 p-3 shadow-sm transition-all"
          />
        </div>
        
        <motion.button 
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] px-6 py-3 rounded-xl font-bold transition-all shadow-md"
        >
          <AddIcon fontSize="small" /> Nouveau Projet
        </motion.button>
      </div>

      {/* PROJECTS TABLE */}
      <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Aperçu</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Titre du Projet</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Client</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            
            <AnimatePresence mode="wait">
              {status === 'loading' ? (
                <motion.tbody key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                      </td>
                    </tr>
                  ))}
                </motion.tbody>
              ) : (
                <motion.tbody key="data" variants={containerVariants} initial="hidden" animate="visible" className="divide-y divide-gray-50">
                  {items.map((project: Project) => (
                    <motion.tr key={project.id} variants={rowVariants} className="hover:bg-[#fdfaf9]/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#d7ccc8] shadow-sm bg-gray-50 flex items-center justify-center">
                          {project.cover_url ? (
                            <motion.img whileHover={{ scale: 1.15 }} src={project.cover_url} alt={project.title} className="w-full h-full object-cover" />
                          ) : (
                            <ArchitectureIcon className="text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">{project.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#A66D3B]/10 text-[#A66D3B]">
                          {project.category?.name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{project.client || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <motion.button 
                            onClick={() => openEditModal(project)}
                            whileHover={{ rotate: 15, scale: 1.1 }} 
                            className="p-2 text-[#8d6e63] hover:text-[#A66D3B] hover:bg-[#A66D3B]/10 rounded-lg transition-colors"
                          >
                            <EditIcon fontSize="small" />
                          </motion.button>
                          <motion.button 
                            onClick={() => openDeleteModal(project)}
                            whileHover={{ rotate: -15, scale: 1.1 }} 
                            className="p-2 text-[#d32f2f] hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                          >
                            <DeleteIcon fontSize="small" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="px-6 py-4 bg-[#fdfcfb] border-t border-[#f0e6e0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-[#8c7365]">
            Page <strong className="text-[#5a463a]">{currentPage}</strong> sur {totalPages}
          </span>
        
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-md text-[#8c7365] hover:bg-[#f5ede8] disabled:opacity-20 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
        
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-all
                      ${currentPage === pageNum 
                        ? 'bg-[#a67c52] text-white shadow-sm' 
                        : 'text-[#8c7365] hover:bg-[#f5ede8] border border-transparent hover:border-[#e2d5cd]'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
        
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-md text-[#8c7365] hover:bg-[#f5ede8] disabled:opacity-20 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden sm:block w-[100px]"></div>
        </div>
      </div>

      {/* MODALS */}
      <AddProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {selectedProject && (
        <>
          <EditProjectModal 
            isOpen={isEditModalOpen} 
            onClose={() => { setIsEditModalOpen(false); setSelectedProject(null); }} 
            project={selectedProject} 
          />
          <DeleteProjectModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => { setIsDeleteModalOpen(false); setSelectedProject(null); }} 
            project={selectedProject} 
          />
        </>
      )}
    </motion.div>
  );
};

export default ProjectsPage;