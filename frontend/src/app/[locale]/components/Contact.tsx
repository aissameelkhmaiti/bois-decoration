"use client";

import { Phone, Mail, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion"; // Importation de Framer Motion

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();

  // Variantes pour les éléments de la liste de contact
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: locale === 'ar' ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Infos de Contact avec apparition échelonnée */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`space-y-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">
                {t('heading')}
              </h2>
              <p className="text-gray-600">
                {t('description')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: Phone, label: t('phone.label'), value: t('phone.value') },
                { icon: Mail, label: t('email.label'), value: t('email.value') },
                { icon: MapPin, label: t('address.label'), value: t('address.value') }
              ].map((info, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B] hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
                    <h4 className="font-bold text-[#2D2D2D]">
                      {info.label}
                    </h4>
                    <p className="text-gray-600">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <motion.div 
              variants={itemVariants}
              className={`flex gap-4 ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}
            >
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Formulaire avec apparition latérale */}
          <motion.div 
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#F4EFEA] p-8 md:p-10 rounded-2xl border border-[#E5D6C8] shadow-sm"
          >
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder={t('form.name.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
                <input 
                  type="email" 
                  placeholder={t('form.email.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <input 
                type="text" 
                placeholder={t('form.subject.placeholder')}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
              <textarea 
                placeholder={t('form.message.placeholder')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md resize-none"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              ></textarea>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full bg-[#A66D3B] hover:bg-white text-white hover:text-[#2D2D2D] border border-transparent hover:border-[#A66D3B] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <span>
                  {t('form.submit')}
                </span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}