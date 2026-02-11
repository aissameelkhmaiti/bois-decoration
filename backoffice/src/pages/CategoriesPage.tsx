import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCategories } from '../redux/categoriesSlice';
import { type RootState, type AppDispatch } from '../redux/store';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Types & Modals
import { type Category } from '../types/category';
import AddCategoryModal from '../components/categories/Addcategorymodal';
import EditCategoryModal from '../components/categories/Editcategorymodal';
import DeleteCategoryModal from '../components/categories/Deletecategorymodal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // On récupère data qui contient maintenant { data: Category[], last_page: number, ... }
  const { data, status, error } = useSelector((state: RootState) => state.categories);

  // --- États pour Pagination et Filtre ---
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // --- États des modals ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // --- Fetching avec Filter & Pagination ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchCategories({ page: currentPage, search: searchTerm }));
    }, 400); // Délai pour éviter trop d'appels API lors de la saisie

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, currentPage, searchTerm]);

  // Helpers pour les données paginées de Laravel
  const categoriesList = data?.data || [];
  const totalPages = data?.last_page || 1;

  // Handlers Modals
  const openEditModal = (cat: Category) => { setSelectedCategory(cat); setIsEditModalOpen(true); };
  const openDeleteModal = (cat: Category) => { setSelectedCategory(cat); setIsDeleteModalOpen(true); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">

      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <CategoryIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Gestion des Catégories</h1>
      </div>

      {/* --- BARRE D'OUTILS --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[350px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white border border-[#d7ccc8] rounded-xl pl-10 p-3 focus:border-[#A66D3B] outline-none shadow-sm"
          />
        </div>

        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] px-6 py-3 rounded-xl font-bold transition-all shadow-md"
        >
          <AddIcon fontSize="small" /> Nouvelle Catégorie
        </motion.button>
      </div>

      {/* --- TABLEAU --- */}
      <div className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Nom</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Description</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase text-center">Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              {status === 'loading' ? (
                <motion.tbody key="loading">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={3} className="px-6 py-4"><div className="h-10 bg-gray-100 rounded-xl w-full"></div></td>
                    </tr>
                  ))}
                </motion.tbody>
              ) : (
                <motion.tbody
                  key="data"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-50"
                >
                  {categoriesList.map((cat: Category) => (
                    <motion.tr key={cat.id} variants={rowVariants} className="hover:bg-[#fdfaf9]/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">{cat.name}</td>
                      <td className="px-6 py-4 text-gray-600">{cat.description || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openEditModal(cat)} className="p-2 text-[#8d6e63] hover:bg-[#A66D3B]/10 rounded-lg"><EditIcon fontSize="small" /></button>
                          <button onClick={() => openDeleteModal(cat)} className="p-2 text-[#d32f2f] hover:bg-red-50 rounded-lg"><DeleteIcon fontSize="small" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </table>
        </div>

        
        {/* --- PAGINATION CONTROLS --- */}
        <div className="px-6 py-4 bg-[#fdfcfb] border-t border-[#f0e6e0] flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl">

          {/* Texte informatif à gauche (optionnel, peut être supprimé si vous voulez un centrage pur) */}
          <span className="text-sm text-[#8c7365] order-2 sm:order-1">
            Page <strong className="text-[#5a463a]">{currentPage}</strong> sur {totalPages}
          </span>

          {/* Groupe de navigation centré */}
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {/* Précédent */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-md text-[#8c7365] hover:bg-[#f5ede8] disabled:opacity-20 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Numéros de pages */}
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                const isActive = currentPage === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-all
              ${isActive
                        ? 'bg-[#a67c52] text-white shadow-sm'
                        : 'text-[#8c7365] hover:bg-[#f5ede8] border border-transparent hover:border-[#e2d5cd]'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Suivant */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-md text-[#8c7365] hover:bg-[#f5ede8] disabled:opacity-20 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Espace vide pour équilibrer le centrage sur desktop (order-3) */}
          <div className="hidden sm:block w-[100px] order-3"></div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditCategoryModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} category={selectedCategory} />
      <DeleteCategoryModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} category={selectedCategory} />

      {status === 'failed' && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-center">{error}</div>}
    </motion.div>
  );
};

export default CategoriesPage;