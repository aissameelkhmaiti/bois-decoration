"use client";

import { Phone, Mail, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Infos de Contact */}
          <div className={`space-y-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            <div>
              <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">
                {t('heading')}
              </h2>
              <p className="text-gray-600">
                {t('description')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Téléphone */}
              <div className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <Phone className="w-6 h-6" />
                </div>
                <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold text-[#2D2D2D]">
                    {t('phone.label')}
                  </h4>
                  <p className="text-gray-600">
                    {t('phone.value')}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <Mail className="w-6 h-6" />
                </div>
                <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold text-[#2D2D2D]">
                    {t('email.label')}
                  </h4>
                  <p className="text-gray-600">
                    {t('email.value')}
                  </p>
                </div>
              </div>

              {/* Adresse */}
              <div className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold text-[#2D2D2D]">
                    {t('address.label')}
                  </h4>
                  <p className="text-gray-600">
                    {t('address.value')}
                  </p>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux (optionnel) */}
            <div className={`flex gap-4 ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-[#F4EFEA] p-8 md:p-10 rounded-2xl border border-[#E5D6C8]">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder={t('form.name.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
                <input 
                  type="email" 
                  placeholder={t('form.email.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <input 
                type="text" 
                placeholder={t('form.subject.placeholder')}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
              <textarea 
                placeholder={t('form.message.placeholder')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              ></textarea>
              <button 
                type="submit" 
                className={`w-full bg-[#A66D3B] hover:bg-[#FFFFFF] text-white hover:text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <span>
                  {t('form.submit')}
                </span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}