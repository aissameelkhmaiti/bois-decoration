"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  ChevronLeft, 
  Send, 
  Phone, 
  Clock,
  FileText,
  Loader2 
} from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion"; // Importation Framer Motion

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  const t = useTranslations('quote');
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('http://localhost:8000/api/quotes', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');

      const data = await res.json();
      setSuccessMessage(data.message || t('success.message'));
      setSubmitted(true);
      setIsGeneratingPdf(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const quoteId = data.quote_id;
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`http://localhost:8000/api/quotes/${quoteId}/status`);
          const statusData = await statusRes.json();

          if (statusData.ready) {
            clearInterval(pollInterval);
            setPdfUrl(statusData.pdf_url);
            setIsGeneratingPdf(false);
          }
        } catch (err) {
          console.error("Erreur de polling", err);
        }
      }, 2000);

    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // VUE DE SUCCÈS ANIMÉE
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-[#E5D6C8]"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-serif text-[#2D2D2D] mb-4 font-bold">
            {t('success.title')}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: successMessage }}></p>
          
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {isGeneratingPdf ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100"
                >
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-sm text-blue-600 font-medium">Génération de votre document PDF...</p>
                </motion.div>
              ) : pdfUrl ? (
                <motion.a 
                  key="download"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#2D2D2D] hover:bg-[#A66D3B] text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5" />
                  TÉLÉCHARGER MON DEVIS PDF
                </motion.a>
              ) : null}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#E5D6C8] mb-8"
          >
            <p className="text-sm font-bold text-[#A66D3B] uppercase tracking-widest mb-3">
              {t('success.urgent')}
            </p>
            <div className={`flex items-center justify-center gap-3 text-[#2D2D2D] font-bold text-xl ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Phone className="w-6 h-6" />
              <a href="tel:0600000000">{t('phone')}</a>
            </div>
          </motion.div>

          <Link 
            href={`/${locale}`} 
            className={`text-[#A66D3B] font-bold uppercase text-sm tracking-widest hover:underline flex items-center justify-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {locale === 'ar' && <ChevronLeft className="w-4 h-4 rotate-180" />}
            {t('success.back')}
            {locale !== 'ar' && <ChevronLeft className="w-4 h-4" />}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <Link 
          href={`/${locale}`} 
          className={`inline-flex items-center text-gray-500 hover:text-[#A66D3B] mb-8 transition-colors group ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          {locale === 'ar' ? (
            <>
              <span>{t('back')}</span>
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:translate-x-1 rotate-180" />
            </>
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span>{t('back')}</span>
            </>
          )}
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E5D6C8]"
        >
          <div className="bg-[#A66D3B] p-8 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{t('title')}</h1>
            <p className="opacity-90 italic">{t('subtitle')}</p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="p-8 md:p-12 space-y-6" 
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Champs du formulaire avec animation d'entrée en cascade */}
            {[
              { label: t('form.fullName.label'), name: "full_name", type: "text", placeholder: t('form.fullName.placeholder'), required: true },
              { label: t('form.phone.label'), name: "phone", type: "tel", placeholder: t('form.phone.placeholder'), required: true },
              { label: t('form.email.label'), name: "email", type: "email", placeholder: t('form.email.placeholder'), required: false },
              { label: t('form.city.label'), name: "city", type: "text", placeholder: t('form.city.placeholder'), required: false }
            ].reduce((acc: any[], curr, i) => {
              // On regroupe par 2 pour la grille
              if (i % 2 === 0) acc.push([curr]);
              else acc[acc.length - 1].push(curr);
              return acc;
            }, []).map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {row.map((field: any) => (
                  <motion.div 
                    key={field.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * rowIndex }}
                  >
                    <label className="text-sm font-bold text-gray-700">{field.label} {field.required && '*'}</label>
                    <input name={field.name} required={field.required} type={field.type} placeholder={field.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50" />
                  </motion.div>
                ))}
              </div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="text-sm font-bold text-gray-700">{t('form.projectType.label')} *</label>
              <select name="project_type" required className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50">
                <option value="">{t('form.projectType.placeholder')}</option>
                <option value="cuisine">{t('form.projectType.options.kitchen')}</option>
                <option value="living-room">{t('form.projectType.options.livingRoom')}</option>
                <option value="bedroom">{t('form.projectType.options.bedroom')}</option>
                <option value="other">{t('form.projectType.options.other')}</option>
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <label className="text-sm font-bold text-gray-700">{t('form.description.label')} *</label>
              <textarea name="description" required rows={4} placeholder={t('form.description.placeholder')}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50"></textarea>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <label className="text-sm font-bold text-gray-700">{t('form.budget.label')}</label>
                <input name="budget" type="text" placeholder={t('form.budget.placeholder')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50" />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <label className="text-sm font-bold text-gray-700">{t('form.photos.label')}</label>
                <input name="photo" type="file" className="w-full border-2 border-dashed border-[#E5D6C8] rounded-xl p-3 cursor-pointer bg-gray-50 hover:bg-white transition-colors" />
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#A66D3B] hover:bg-white border hover:border-[#A66D3B] hover:text-[#A66D3B]  text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {t('form.submit')}
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <div className={`flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-3 h-3" />
              <span>{t('form.responseTime')}</span>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}