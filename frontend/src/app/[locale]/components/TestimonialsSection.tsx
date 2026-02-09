"use client";

import { useState } from "react";
import { Quote, Star, Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();

  // États du formulaire
  const [formData, setFormData] = useState({
    author: "",
    quote: "",
    rating: 5,
    location: ""
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setServerErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 422) {
        setServerErrors(data.errors);
        setStatus('error');
      } else if (response.ok) {
        setStatus('success');
        setFormData({ author: "", quote: "", rating: 5, location: "" });
        setTimeout(() => setStatus('idle'), 5000);
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
        
        {/* En-tête avec étoiles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#A66D3B] text-[#A66D3B]" />
            ))}
          </div>
          <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">{t('heading')}</h2>
          <div className="h-1 w-16 bg-[#A66D3B] mx-auto"></div>
        </motion.div>
        
        {/* Carte de témoignage (Exemple statique ou dynamique) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-2xl shadow-xl p-10 md:p-16 border border-[#E5D6C8] mb-12"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#A66D3B] p-4 rounded-full shadow-lg">
            <Quote className="w-8 h-8 text-white" />
          </div>

          <blockquote className={`text-center ${locale === 'ar' ? 'text-right' : 'text-center'}`}>
            <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-8 leading-relaxed">
              "{t('testimonial.quote')}"
            </p>
            <footer className="flex flex-col items-center">
              <cite className="not-italic font-bold text-[#A66D3B] text-lg uppercase tracking-widest">
                {t('testimonial.author')}
              </cite>
            </footer>
          </blockquote>
        </motion.div>

        {/* Formulaire d'ajout d'avis */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-[#E5D6C8] shadow-sm"
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-serif text-[#2D2D2D]">
              {locale === 'ar' ? 'أخبرنا عن تجربتك' : 'Votre avis nous intéresse'}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {locale === 'ar' ? 'رأيك يساعدنا على التحسن' : 'Partagez votre ressenti avec notre communauté.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Auteur */}
              <div>
                <input
                  type="text"
                  placeholder={locale === 'ar' ? 'الاسم بالكامل' : 'Nom complet'}
                  required
                  className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A66D3B] outline-none transition-all ${serverErrors.author ? 'border-red-500' : 'border-[#E5D6C8]'}`}
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
                {serverErrors.author && <p className="text-red-500 text-xs mt-1">{serverErrors.author[0]}</p>}
              </div>

              {/* Localisation */}
              <input
                type="text"
                placeholder={locale === 'ar' ? 'المدينة' : 'Ville (ex: Paris)'}
                className="w-full p-3 rounded-lg border border-[#E5D6C8] focus:ring-2 focus:ring-[#A66D3B] outline-none"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            {/* Note par étoiles */}
            <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg border border-[#E5D6C8]">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-tighter">Note</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="hover:scale-125 transition-transform"
                  >
                    <Star className={`w-7 h-7 ${formData.rating >= star ? 'fill-[#A66D3B] text-[#A66D3B]' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Témoignage (Quote) */}
            <div>
              <textarea
                required
                minLength={10}
                rows={4}
                placeholder={locale === 'ar' ? 'اكتب رأيك هنا (10 أحرف على الأقل)...' : 'Votre message (minimum 10 caractères)...'}
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#A66D3B] outline-none transition-all ${serverErrors.quote ? 'border-red-500' : 'border-[#E5D6C8]'}`}
                value={formData.quote}
                onChange={(e) => setFormData({...formData, quote: e.target.value})}
              />
              {serverErrors.quote && <p className="text-red-500 text-xs mt-1">{serverErrors.quote[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#A66D3B] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#8e5a2f] disabled:bg-gray-400 transition-all shadow-md active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <><Send className="w-4 h-4" /> {locale === 'ar' ? 'إرسال التقييم' : 'Envoyer mon avis'}</>
              )}
            </button>

            {/* Messages d'état */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-600 font-medium bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  {locale === 'ar' ? 'تم استلام رأيك، شكراً لك!' : 'Votre avis a été enregistré avec succès !'}
                </motion.div>
              )}
              {status === 'error' && !Object.keys(serverErrors).length && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-600 font-medium bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  {locale === 'ar' ? 'حدث خطأ ما. حاول ثانية' : 'Erreur réseau ou serveur.'}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}