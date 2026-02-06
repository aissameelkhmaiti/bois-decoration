"use client";

import { Quote, Star } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#F4EFEA]">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête avec étoiles pour la preuve sociale */}
        <div className={`text-center mb-16 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#A66D3B] text-[#A66D3B]" />
            ))}
          </div>
          <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">
            {t('heading')}
          </h2>
          <div className="w-16 h-1 bg-[#A66D3B] mx-auto"></div>
        </div>
        
        {/* Carte de témoignage stylisée */}
        <div className="relative bg-white rounded-2xl shadow-xl p-10 md:p-16 border border-[#E5D6C8]">
          {/* Icône de citation positionnée de manière élégante */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#A66D3B] p-4 rounded-full shadow-lg">
            <Quote className="w-8 h-8 text-white" />
          </div>

          <blockquote className={`text-center ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            <p className="text-xl md:text-2xl font-serif italic text-gray-700 mb-8 leading-relaxed">
              "{t('testimonial.quote')}"
            </p>
            
            <footer className="flex flex-col items-center">
              <span className="h-px w-10 bg-[#E5D6C8] mb-4"></span>
              <cite className="not-italic font-bold text-[#A66D3B] text-lg uppercase tracking-widest">
                {t('testimonial.author')}
              </cite>
              <span className="text-sm text-gray-400 mt-1">
                {t('testimonial.location')}
              </span>
            </footer>
          </blockquote>

          {/* Décoration d'angle pour rappeler le bois */}
          <div className={`absolute bottom-0 pointer-events-none w-24 h-24 bg-[#A66D3B]/5 rounded-tl-full ${
            locale === 'ar' ? 'left-0 rounded-tr-full rounded-tl-none' : 'right-0'
          }`}></div>
        </div>
        
        {/* Indicateurs de pagination (visuels uniquement) */}
        <div className="flex justify-center gap-3 mt-10">
          <div className="w-10 h-1.5 bg-[#A66D3B] rounded-full"></div>
          <div className="w-3 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}