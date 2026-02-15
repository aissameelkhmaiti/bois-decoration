"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();

  // --- ÉTATS DU FORMULAIRE ---
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // --- LOGIQUE D'ENVOI ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remplace l'URL par celle de ton API Laravel (ex: http://localhost:8000/api/contact)
      await axios.post('http://localhost:8000/api/contact', formData);
      
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Réinitialise le message de succès après 5 secondes
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  // --- ANIMATIONS ---
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
          
          {/* --- INFOS DE CONTACT --- */}
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
                    <h4 className="font-bold text-[#2D2D2D]">{info.label}</h4>
                    <p className="text-gray-600">{info.value}</p>
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
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B] hover:bg-[#A66D3B] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* --- FORMULAIRE --- */}
          <motion.div 
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#F4EFEA] p-8 md:p-10 rounded-2xl border border-[#E5D6C8] shadow-sm relative"
          >
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#F4EFEA]/90 z-10 flex flex-col items-center justify-center rounded-2xl text-center p-6"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-[#2D2D2D]">Merci !</h3>
                  <p className="text-gray-600">Votre message a bien été envoyé.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={t('form.name.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={t('form.email.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
              <input 
                required
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder={t('form.subject.placeholder')}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder={t('form.message.placeholder')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white transition-all shadow-sm focus:shadow-md resize-none"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              ></textarea>
              
              <motion.button 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full bg-[#A66D3B] hover:bg-[#8B5A2B] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{t('form.submit')}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}