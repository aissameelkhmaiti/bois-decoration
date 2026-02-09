import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateCategory, fetchCategories } from '../../redux/categoriesSlice';
import { type Category } from '../../types/category';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1], 
      staggerChildren: 0.08 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98, 
    y: 10, 
    transition: { 
      duration: 0.2 
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const EditCategoryModal = ({ isOpen, onClose, category }: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les données de la catégorie
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
      });
    }
  }, [category]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
    setIsSubmitting(true);

    try {
      await dispatch(updateCategory({ id: category.id, data: formData })).unwrap();
      // Rafraîchir la liste des catégories
      await dispatch(fetchCategories());
      onClose();
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour de la catégorie');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
  };

  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50";
  const labelStyle = "block text-[13px] font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1";

  if (!category) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-md"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white rounded-[2rem] w-full max-w-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative z-10 border border-gray-100"
          >
            {/* Header avec barre d'accentuation */}
            <div className="relative px-10 pt-10 pb-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#A66D3B] rounded-b-full" />
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Modifier la Catégorie</h2>
                  <p className="text-gray-500 mt-1 font-medium">Mettez à jour les informations de la catégorie.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-10 pb-10">
              <div className="space-y-5 mb-8">
                <motion.div variants={itemVariants}>
                  <label className={labelStyle}>Nom de la catégorie</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="ex: Architecture Moderne" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className={inputStyle} 
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className={labelStyle}>Description</label>
                  <textarea 
                    name="description" 
                    placeholder="Décrivez cette catégorie..." 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows={4} 
                    className={`${inputStyle} resize-none`} 
                  />
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 py-3 rounded-xl font-medium bg-black border-2 border-black hover:bg-transparent text-white hover:text-black transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] rounded-xl font-medium shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Mise à jour en cours...' : 'Enregistrer les modifications'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditCategoryModal;