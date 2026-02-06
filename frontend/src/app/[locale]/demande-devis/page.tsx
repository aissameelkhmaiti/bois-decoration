"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  ChevronLeft, 
  Upload, 
  Send, 
  Phone, 
  Clock 
} from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations('quote');
  const locale = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous ajouterez votre logique d'enregistrement en base de données
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('success.message')}
          </p>
          
          <div className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#E5D6C8] mb-8">
            <p className="text-sm font-bold text-[#A66D3B] uppercase tracking-widest mb-3">
              {t('success.urgent')}
            </p>
            <div className={`flex items-center justify-center gap-3 text-[#2D2D2D] font-bold text-xl ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Phone className="w-6 h-6" />
              <a href="tel:0600000000">
                {t('phone')}
              </a>
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
        {/* Lien de retour */}
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
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {t('title')}
            </h1>
            <p className="opacity-90 italic">
              {t('subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            
            {/* Infos Personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.fullName.label')} *
                </label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                  placeholder={t('form.fullName.placeholder')} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.phone.label')} *
                </label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                  placeholder={t('form.phone.placeholder')} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.email.label')}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                  placeholder={t('form.email.placeholder')} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.city.label')}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                  placeholder={t('form.city.placeholder')} 
                />
              </div>
            </div>

            {/* Détails du projet */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                {t('form.projectType.label')} *
              </label>
              <select 
                required 
                className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50"
              >
                <option value="">{t('form.projectType.placeholder')}</option>
                <option value="cuisine">{t('form.projectType.options.kitchen')}</option>
                <option value="living-room">{t('form.projectType.options.livingRoom')}</option>
                <option value="bedroom">{t('form.projectType.options.bedroom')}</option>
                <option value="office">{t('form.projectType.options.office')}</option>
                <option value="terrace">{t('form.projectType.options.terrace')}</option>
                <option value="stairs">{t('form.projectType.options.stairs')}</option>
                <option value="furniture">{t('form.projectType.options.furniture')}</option>
                <option value="renovation">{t('form.projectType.options.renovation')}</option>
                <option value="other">{t('form.projectType.options.other')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">
                {t('form.description.label')} *
              </label>
              <textarea 
                required 
                rows={4} 
                className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                placeholder={t('form.description.placeholder')}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.budget.label')}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border-[#E5D6C8] focus:ring-[#A66D3B] focus:border-[#A66D3B] bg-gray-50" 
                  placeholder={t('form.budget.placeholder')} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  {t('form.photos.label')}
                </label>
                <div className="relative group cursor-pointer border-2 border-dashed border-[#E5D6C8] rounded-xl p-3 text-center hover:bg-gray-50 transition">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className={`flex items-center justify-center gap-2 text-gray-500 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Upload className="w-4 h-4 text-[#A66D3B]" />
                    <span className="text-xs">
                      {t('form.photos.button')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton d'envoi */}
            <div className="pt-4">
              <button 
                type="submit" 
                className={`w-full bg-[#A66D3B] hover:bg-[#8B5A2B] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg text-lg uppercase tracking-widest ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <span>{t('form.submit')}</span>
                <Send className="w-5 h-5" />
              </button>
              <div className={`flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-3 h-3" />
                <span>{t('form.responseTime')}</span>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}