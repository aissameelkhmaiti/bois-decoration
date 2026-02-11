import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchReviews } from '../../redux/reviewSlice';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

const AddReviewModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ author: '', quote: '', rating: 5, location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = 'http://localhost:8000/'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${url}/api/reviews`, formData);
      dispatch(fetchReviews({ page: 1, search: '' }));
      onClose();
      setFormData({ author: '', quote: '', rating: 5, location: '' });
    } catch (err) {
      alert('Erreur lors de l\'ajout de l\'avis');
    } finally { setIsSubmitting(false); }
  };

  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#A66D3B] outline-none bg-gray-50/50";
  const labelStyle = "block text-[12px] font-bold text-gray-500 uppercase mb-1 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden">
            <div className="px-8 pt-8 pb-4">
              <h2 className="text-2xl font-black text-gray-900">Nouveau Témoignage</h2>
            </div>
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
              <div>
                <label className={labelStyle}>Client</label>
                <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required className={inputStyle} placeholder="Nom du client" />
              </div>
              <div>
                <label className={labelStyle}>Note</label>
                <div className="flex gap-1 bg-gray-50 p-2 rounded-xl w-fit">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} onClick={() => setFormData({...formData, rating: s})} className={`cursor-pointer ${formData.rating >= s ? 'text-[#A66D3B]' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Message</label>
                <textarea value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} required rows={3} className={`${inputStyle} resize-none`} placeholder="Son témoignage..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 py-3 font-bold border-2 border-black rounded-xl">Annuler</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 font-bold bg-[#A66D3B] text-white rounded-xl shadow-lg">{isSubmitting ? '...' : 'Enregistrer'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AddReviewModal;