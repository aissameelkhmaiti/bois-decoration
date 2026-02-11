import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { fetchQuotes } from '../redux/quotesSlice';
import { type RootState, type AppDispatch } from '../redux/store';
import ViewQuoteModal from '../components/quotes/ViewQuoteModal';
import DeleteQuoteModal from '../components/quotes/DeleteQuoteModal';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { type Quote } from '../redux/quotesSlice';

// --- Animations Variants (Typage ajouté pour éviter les erreurs TS) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const QuotesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quotes);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal d'aperçu
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);

  // Modal de suppression
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null);

  const handleViewPdf = (id: number) => {
    setSelectedQuoteId(id);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (quote: Quote) => {
    setQuoteToDelete(quote); // On passe l'objet complet pour afficher le nom dans le modal
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchQuotes({ page: currentPage, search: searchTerm }));
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, currentPage, searchTerm]);

  const quotesList = data?.data || [];
  const totalPages = data?.last_page || 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">

      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <DescriptionIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Gestion des Devis</h1>
      </div>

      {/* --- BARRE DE RECHERCHE --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-[350px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un client ou un projet..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white border border-[#d7ccc8] rounded-xl pl-10 p-3 outline-none focus:border-[#A66D3B] shadow-sm transition-all"
          />
        </div>
      </div>

      {/* --- TABLEAU --- */}
      <div className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Client</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Projet</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase">Budget</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase text-center">Actions</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              {status === 'loading' ? (
                <motion.tbody key="skeleton">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-50">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-100 rounded w-1/2"></div></td>
                      <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded-full w-24"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                      <td className="px-6 py-4"><div className="flex justify-center gap-2"><div className="w-8 h-8 bg-gray-100 rounded-lg"></div><div className="w-8 h-8 bg-gray-100 rounded-lg"></div></div></td>
                    </tr>
                  ))}
                </motion.tbody>
              ) : (
                <motion.tbody
                  key="content"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-gray-50"
                >
                  {quotesList.map((quote: Quote) => (
                    <motion.tr
                      key={quote.id}
                      variants={rowVariants}
                      className="hover:bg-[#fdfaf9]/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{quote.full_name}</div>
                        <div className="text-xs text-gray-500">{quote.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#A66D3B]/5 border border-[#A66D3B]/10 rounded-full text-xs font-semibold text-[#8d6e63]">
                          {quote.project_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{quote.budget || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleViewPdf(quote.id)} className="p-2 text-[#8d6e63] hover:bg-[#A66D3B]/10 rounded-lg transition-colors">
                            <VisibilityIcon fontSize="small" />
                          </button>
                          <button onClick={() => openDeleteModal(quote)} className="p-2 text-[#d32f2f] hover:bg-red-50 rounded-lg transition-colors">
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </table>
        </div>

        {/* --- PAGINATION --- */}
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

      {status === 'failed' && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">
          {error || "Une erreur est survenue lors du chargement."}
        </div>
      )}

      {/* --- MODALS --- */}
      <ViewQuoteModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        quoteId={selectedQuoteId}
      />

      <DeleteQuoteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        quote={quoteToDelete} // Correction ici : on passe l'objet quote, pas l'ID
      />
    </motion.div>
  );
};

export default QuotesPage;