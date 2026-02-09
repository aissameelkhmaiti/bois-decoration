import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-8 z-10 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <DeleteIcon />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Supprimer l'utilisateur
              </h2>
            </div>

            <p className="text-gray-600 mb-8">
              Êtes-vous sûr de vouloir supprimer  
              <span className="font-semibold text-gray-800">
                {" "}{userName}
              </span> ?  
              <br />Cette action est irréversible.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-black hover:text-white transition"
              >
                Annuler
              </button>

              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-black transition"
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

export default DeleteUserModal;