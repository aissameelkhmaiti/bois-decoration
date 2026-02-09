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
      // 1. Envoi des données au serveur
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

      // 2. Polling pour vérifier si le PDF est prêt
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

  // VUE DE SUCCÈS APRÈS ENVOI
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-[#E5D6C8]">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-serif text-[#2D2D2D] mb-4 font-bold">
            {t('success.title')}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: successMessage }}></p>
          
          {/* ZONE DE TÉLÉCHARGEMENT PDF */}
          <div className="mb-8">
            {isGeneratingPdf ? (
              <div className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-blue-600 font-medium">Génération de votre document PDF...</p>
              </div>
            ) : pdfUrl ? (
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#2D2D2D] hover:bg-white hover:text-black text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                <FileText className="w-5 h-5" />
                TÉLÉCHARGER MON DEVIS PDF
              </a>
            ) : null}
          </div>

          <div className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#E5D6C8] mb-8">
            <p className="text-sm font-bold text-[#A66D3B] uppercase tracking-widest mb-3">
              {t('success.urgent')}
            </p>
            <div className={`flex items-center justify-center gap-3 text-[#2D2D2D] font-bold text-xl ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Phone className="w-6 h-6" />
              <a href="tel:0600000000">{t('phone')}</a>
            </div>
          </div>

          <Link 
            href={`/${locale}`} 
            className={`text-[#A66D3B] font-bold uppercase text-sm tracking-widest hover:underline flex items-center justify-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {locale === 'ar' && <ChevronLeft className="w-4 h-4 rotate-180" />}
            {t('success.back')}
            {locale !== 'ar' && <ChevronLeft className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
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

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E5D6C8]">
          <div className="bg-[#A66D3B] p-8 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{t('title')}</h1>
            <p className="opacity-90 italic">{t('subtitle')}</p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="p-8 md:p-12 space-y-6" 
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.fullName.label')} *</label>
                <input name="full_name" required type="text" placeholder={t('form.fullName.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.phone.label')} *</label>
                <input name="phone" required type="tel" placeholder={t('form.phone.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.email.label')}</label>
                <input name="email" type="email" placeholder={t('form.email.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.city.label')}</label>
                <input name="city" type="text" placeholder={t('form.city.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">{t('form.projectType.label')} *</label>
              <select name="project_type" required className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50">
                <option value="">{t('form.projectType.placeholder')}</option>
                <option value="cuisine">{t('form.projectType.options.kitchen')}</option>
                <option value="living-room">{t('form.projectType.options.livingRoom')}</option>
                <option value="bedroom">{t('form.projectType.options.bedroom')}</option>
                <option value="other">{t('form.projectType.options.other')}</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700">{t('form.description.label')} *</label>
              <textarea name="description" required rows={4} placeholder={t('form.description.placeholder')}
                className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.budget.label')}</label>
                <input name="budget" type="text" placeholder={t('form.budget.placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700">{t('form.photos.label')}</label>
                <input name="photo" type="file" className="w-full border-2 border-dashed border-[#E5D6C8] rounded-xl p-3 cursor-pointer" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#A66D3B] hover:bg-[#FFFFFF] text-white hover:text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg">
              {loading ? 'Envoi...' : t('form.submit')}
              <Send className="w-5 h-5" />
            </button>

            <div className={`flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-3 h-3" />
              <span>{t('form.responseTime')}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}