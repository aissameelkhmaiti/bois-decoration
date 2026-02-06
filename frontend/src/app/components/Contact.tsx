import { Phone, Mail, MapPin, Send, Instagram, Facebook } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Infos de Contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif text-[#2D2D2D] mb-4">Contactez-nous</h2>
              <p className="text-gray-600">
                Un projet en tête ? Parlons-en ensemble. Nous vous accompagnons de la conception à la pose.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D]">Téléphone</h4>
                  <p className="text-gray-600">+212 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D]">Email</h4>
                  <p className="text-gray-600">contact@ajidecory.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#F4EFEA] p-3 rounded-lg text-[#A66D3B]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D]">Atelier</h4>
                  <p className="text-gray-600">Tamaris, Casablanca, Maroc</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-[#F4EFEA] p-8 md:p-10 rounded-2xl border border-[#E5D6C8]">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nom complet" 
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
                />
              </div>
              <input 
                type="text" 
                placeholder="Sujet (ex: Devis Terrasse)" 
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
              />
              <textarea 
                placeholder="Votre message..." 
                
                className="w-full px-4 py-3 rounded-lg border-transparent focus:border-[#A66D3B] focus:ring-0 bg-white"
              ></textarea>
              <button className="w-full bg-[#A66D3B] hover:bg-[#8B5A2B] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg">
                <span>Envoyer le message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}