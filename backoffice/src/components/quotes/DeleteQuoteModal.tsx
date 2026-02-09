import { motion, AnimatePresence  } from 'framer-motion';
import { type Variants } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteQuote } from '../../redux/quotesSlice';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  quote: { id: number; full_name: string } | null;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.9, y: 20 }
};

const DeleteQuoteModal = ({ isOpen, onClose, quote }: Props) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!quote) return;
    try {
      await dispatch(deleteQuote(quote.id)).unwrap();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer ce devis.");
    }
  };

  if (!quote) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10"
          >
            <div className="p-8 text-center">
              {/* Icon Section */}
              <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <WarningAmberRoundedIcon className="text-red-500" sx={{ fontSize: 40 }} />
              </div>

              {/* Text Section */}
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Supprimer le devis ?
              </h2>
              <p className="text-gray-500 font-medium px-4">
                Êtes-vous sûr de vouloir supprimer le devis de <span className="text-gray-900 font-bold">{quote.full_name}</span> ? 
                Cette action supprimera également le fichier PDF et est irréversible.
              </p>
            </div>

            {/* Actions Section */}
            <div className="flex p-6 gap-3 bg-gray-50">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-red-500 border-2 border-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteQuoteModal;