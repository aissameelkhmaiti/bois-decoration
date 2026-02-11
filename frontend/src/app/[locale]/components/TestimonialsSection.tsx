"use client";

import { useState, useEffect } from "react";
import { Quote, Star, Send, Loader2, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  author: string;
  quote: string;
  rating: number;
  location?: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();

  // --- ÉTATS ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  
  // État pour afficher/masquer le formulaire
  const [isFormOpen, setIsFormOpen] = useState(false);

  // États du formulaire
  const [formData, setFormData] = useState({ author: "", quote: "", rating: 5, location: "" });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // --- CHARGEMENT DES AVIS ---
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reviews`);
      if (response.ok) {
        const result = await response.json();
        const fetchedData = Array.isArray(result.data) ? result.data : [];
        setReviews(fetchedData.slice(0, 5)); 
      }
    } catch (error) {
      console.error("Erreur lors du chargement des avis", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // --- NAVIGATION DU CARROUSEL ---
  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // --- SOUMISSION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setServerErrors({});

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 422) {
        setServerErrors(data.errors);
        setStatus('error');
      } else if (response.ok) {
        setStatus('success');
        setFormData({ author: "", quote: "", rating: 5, location: "" });
        
        // Fermer le formulaire après un succès
        setTimeout(() => {
            setStatus('idle');
            setIsFormOpen(false);
            fetchReviews();
        }, 2500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#F4EFEA] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#A66D3B] text-[#A66D3B]" />)}
          </div>
          <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">{t('heading')}</h2>
          <div className="h-1 w-16 bg-[#A66D3B] mx-auto"></div>
        </motion.div>
        
        {/* AFFICHAGE DES AVIS */}
        <div className="relative min-h-[350px]">
          {isLoadingReviews ? (
            <div className="flex justify-center items-center h-48"><Loader2 className="animate-spin text-[#A66D3B]" /></div>
          ) : reviews.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={reviews[currentIndex]?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-[#E5D6C8] mb-12"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#A66D3B] p-4 rounded-full shadow-lg">
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  <div className={`text-center ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
                    <div className="flex justify-center gap-1 mb-6">
                       {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                         <Star key={i} className="w-4 h-4 fill-[#A66D3B] text-[#A66D3B]" />
                       ))}
                    </div>
                    <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-8 leading-relaxed">
                      "{reviews[currentIndex].quote}"
                    </p>
                    <footer className="flex flex-col items-center">
                      <cite className="not-italic font-bold text-[#A66D3B] text-lg uppercase tracking-widest">
                        {reviews[currentIndex].author}
                      </cite>
                      {reviews[currentIndex].location && (
                        <span className="text-sm text-gray-400 mt-1">{reviews[currentIndex].location}</span>
                      )}
                    </footer>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Carrousel */}
              <div className="flex justify-center items-center gap-6 mb-8">
                <button onClick={prevReview} className="p-2 rounded-full border border-[#A66D3B] text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all active:scale-90">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-[#A66D3B]' : 'w-2 bg-[#A66D3B]/20'}`} 
                    />
                  ))}
                </div>
                <button onClick={nextReview} className="p-2 rounded-full border border-[#A66D3B] text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all active:scale-90">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mb-12 italic">Aucun témoignage disponible pour le moment.</p>
          )}
        </div>

        {/* BOUTON D'APPEL À L'ACTION */}
        <div className="flex justify-center mb-12">
          {!isFormOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="bg-[#A66D3B] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#A66D3B]/30 hover:bg-[#8e5a2f] transition-all flex items-center gap-3"
            >
              <Star className="w-5 h-5 fill-white" />
              {locale === 'ar' ? 'إضافة تقييمك' : 'Donner mon avis'}
            </motion.button>
          )}
        </div>

        {/* FORMULAIRE D'AJOUT (ANIMÉ) */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 40, height: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E5D6C8] shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-full text-center">
                  <h3 className="text-3xl font-serif text-[#2D2D2D] mb-2">
                    {locale === 'ar' ? 'شاركنا رأيك' : 'Partagez votre expérience'}
                  </h3>
                  <p className="text-gray-500">Votre satisfaction est notre priorité.</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-1">Nom complet</label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      required
                      className={`w-full p-4 rounded-2xl border outline-none transition-all bg-gray-50 focus:bg-white ${serverErrors.author ? 'border-red-500' : 'border-[#E5D6C8] focus:border-[#A66D3B]'}`}
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                    {serverErrors.author && <p className="text-red-500 text-xs mt-1">{serverErrors.author[0]}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-1">Ville</label>
                    <input
                      type="text"
                      placeholder="Casablanca"
                      className="w-full p-4 rounded-2xl border border-[#E5D6C8] outline-none transition-all bg-gray-50 focus:bg-white focus:border-[#A66D3B]"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-[#E5D6C8]">
                  <span className="text-xs font-bold uppercase text-gray-400">Votre note</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setFormData({...formData, rating: star})} className="transform transition-transform hover:scale-110 active:scale-125">
                        <Star className={`w-8 h-8 ${formData.rating >= star ? 'fill-[#A66D3B] text-[#A66D3B]' : 'text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">Message</label>
                  <textarea
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Décrivez la qualité du travail..."
                    className={`w-full p-4 rounded-2xl border outline-none transition-all bg-gray-50 focus:bg-white ${serverErrors.quote ? 'border-red-500' : 'border-[#E5D6C8] focus:border-[#A66D3B]'}`}
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                  />
                  {serverErrors.quote && <p className="text-red-500 text-xs mt-1">{serverErrors.quote[0]}</p>}
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#A66D3B] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#8e5a2f] disabled:bg-gray-300 shadow-lg shadow-[#A66D3B]/20 transition-all hover:-translate-y-1"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <><Send className="w-5 h-5" /> {locale === 'ar' ? 'إرسال التقييم' : 'Envoyer mon témoignage'}</>}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-sm text-gray-400 hover:text-gray-600 font-medium py-2"
                  >
                    {locale === 'ar' ? 'إلغاء' : 'Annuler'}
                  </button>
                </div>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-600 font-bold bg-green-50 p-4 rounded-2xl border border-green-100">
                      <CheckCircle2 className="w-5 h-5" /> {locale === 'ar' ? 'شكراً لك على تقييمك!' : 'Merci ! Votre avis a été envoyé avec succès.'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}