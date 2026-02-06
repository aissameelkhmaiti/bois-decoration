import Image from "next/image";
import HeroSection from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import Contact from './components/Contact'
import Footer from './components/Footer'
import { locales } from '@/i18n/config';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>; // Ajoutez cette ligne
}) {
  // Déstructurez params
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F2EFE9]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <Contact />
     
    </div>
  );
}

// Optionnel : pour génération statique
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}