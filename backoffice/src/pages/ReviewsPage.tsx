import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchReviews } from '../redux/reviewSlice';
import { type RootState, type AppDispatch } from '../redux/store';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Types & Modals (À créer sur le même modèle que Catégories)
import { type Review } from '../types/review';

import EditReviewModal from '../components/reviews/EditReviewModal';
import DeleteReviewModal from '../components/reviews/DeleteReviewModal';
import AddReviewModal from '../components/reviews/AddReviewModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const ReviewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.reviews);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // --- Fetching avec Debounce ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchReviews({ page: currentPage, search: searchTerm }));
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, currentPage, searchTerm]);

  const reviewsList = data?.data || [];
  const totalPages = data?.last_page || 1;

  const openEditModal = (rev: Review) => { setSelectedReview(rev); setIsEditModalOpen(true); };
  const openDeleteModal = (rev: Review) => { setSelectedReview(rev); setIsDeleteModalOpen(true); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">

      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <RateReviewIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Témoignages Clients</h1>
      </div>

      {/* --- BARRE D'OUTILS --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[350px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un auteur..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white border border-[#d7ccc8] rounded-xl pl-10 p-3 focus:border-[#A66D3B] outline-none shadow-sm"
          />
        </div>

        {/* <motion.button
          onClick={() => setIsAddModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 bg-[#A66D3B] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md"
        >
          <AddIcon fontSize="small" /> Ajouter un Avis
        </motion.button> */}
      </div>

      {/* --- TABLEAU --- */}
      <div className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Client</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase text-center">Note</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Message</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase text-center">Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              {status === 'loading' ? (
                <motion.tbody key="loading">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-4"><div className="h-12 bg-gray-100 rounded-xl w-full"></div></td>
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
                  {reviewsList.map((rev: Review) => (
                    <motion.tr key={rev.id} variants={rowVariants} className="hover:bg-[#fdfaf9]/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{rev.author}</div>
                        <div className="text-xs text-gray-400">{rev.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} sx={{ fontSize: 16 }} className={i < rev.rating ? 'text-[#A66D3B]' : 'text-gray-200'} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600 text-sm line-clamp-2 italic">"{rev.quote}"</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openEditModal(rev)} className="p-2 text-[#8d6e63] hover:bg-[#A66D3B]/10 rounded-lg"><EditIcon fontSize="small" /></button>
                          <button onClick={() => openDeleteModal(rev)} className="p-2 text-[#d32f2f] hover:bg-red-50 rounded-lg"><DeleteIcon fontSize="small" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </table>
        </div>

        {/* --- BARRE DE PAGINATION --- */}
        <div className="px-6 py-4 bg-[#fdfcfb] border-t border-[#f0e6e0] grid grid-cols-3 items-center rounded-b-xl">

          {/* 1. Texte à gauche */}
          <div className="text-sm text-[#8c7365]">
            Page <strong className="text-gray-900">{currentPage}</strong> sur {totalPages}
          </div>

          {/* 2. Boutons parfaitement centrés au milieu */}
          <div className="flex items-center justify-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 text-gray-300 disabled:opacity-50 hover:text-[#a67c52] transition-colors"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1
                      ? 'bg-[#a67c52] text-white shadow-sm'
                      : 'text-[#8c7365] hover:bg-[#f5ede8]'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 text-[#8c7365] hover:text-[#a67c52] disabled:opacity-20 transition-colors"
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          </div>

          {/* 3. Colonne vide à droite pour équilibrer le centrage */}
          <div />
        </div>
      </div>

      {/* --- MODALS --- */}
      <AddReviewModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditReviewModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} review={selectedReview} />
      <DeleteReviewModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} review={selectedReview} />

      {status === 'failed' && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-center">{error}</div>}
    </motion.div>
  );
};

export default ReviewsPage;