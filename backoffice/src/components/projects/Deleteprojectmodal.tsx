import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteProject, fetchProjects } from '../../redux/projectsSlice';
import { type Project } from '../../types/project';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const DeleteProjectModal = ({ isOpen, onClose, project }: Props) => {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!project) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteProject(project.id)).unwrap();
      await dispatch(fetchProjects());
      onClose();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression du projet');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
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
                Supprimer le projet
              </h2>
            </div>

            <p className="text-gray-600 mb-8">
              Êtes-vous sûr de vouloir supprimer le projet  
              <span className="font-semibold text-gray-800">
                {" "}{project.title}
              </span> ? 
              <br />Cette action supprimera toutes les données associées de façon irréversible.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-black hover:text-white transition disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-black transition disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Suppression...</span>
                  </>
                ) : (
                  "Supprimer"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteProjectModal;