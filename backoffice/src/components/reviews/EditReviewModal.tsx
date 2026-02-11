import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchReviews } from '../../redux/reviewSlice';
import { type Review } from '../../types/review';
import axios from 'axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
}

const EditReviewModal = ({ isOpen, onClose, review }: Props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ author: '', quote: '', rating: 5 });

  const url = 'http://localhost:8000/'

  useEffect(() => {
    if (review) setFormData({ author: review.author, quote: review.quote, rating: review.rating });
  }, [review]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!review) return;
    try {
      await axios.put(`${url}/api/reviews/${review.id}`, formData);
      dispatch(fetchReviews({ page: 1, search: '' }));
      onClose();
    } catch (err) { alert('Erreur de mise à jour'); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl relative z-10 p-8">
            <h2 className="text-2xl font-black mb-6">Modifier l'avis</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full border p-3 rounded-xl" />
               <textarea value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} className="w-full border p-3 rounded-xl" rows={4} />
               <button type="submit" className="w-full py-3 bg-black text-white rounded-xl font-bold">Mettre à jour</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default EditReviewModal;