import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ajout de "Loader2" pour l'icône de chargement
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  // 1. Nouvel état pour gérer le chargement
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // 2. Activer le loader au début du submit

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
      // 3. Désactiver le loader en cas d'erreur seulement 
      // (car en cas de succès, on change de page)
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F2EBE1]">
      
      {/* ===================== FORMULAIRE (GAUCHE) ===================== */}
      <div className="w-full md:w-[45%] flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          
          <h1 className="text-4xl text-[#A66D3B] text-center mb-2 font-['Dancing_Script'] font-bold">
            Decorna
          </h1>

          <div className="bg-white/85 backdrop-blur-md p-8 rounded-[24px] border border-[#C4936A]/30 shadow-sm">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              Connexion Dashboard
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    disabled={loading} // Désactiver l'input pendant le chargement
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#C4936A]/50 focus:ring-2 focus:ring-[#A66D3B] focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder="admin@decorna.ma"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading} // Désactiver l'input pendant le chargement
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#C4936A]/50 focus:ring-2 focus:ring-[#A66D3B] focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#A66D3B]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Bouton de soumission avec loader */}
              <button
                type="submit"
                disabled={loading} // Empêcher le double-clic
                className="w-full flex items-center justify-center py-3.5 mt-4 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] font-bold rounded-xl shadow-lg transition-colors duration-200 text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Accéder au Dashboard'
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[#C4936A] text-sm font-medium">
            © 2026 Artisanat d'Excellence
          </p>
        </div>
      </div>

      {/* ===================== IMAGE (DROITE) ===================== */}
      <div
        className="hidden md:flex w-[55%] relative bg-cover bg-center"
        style={{ backgroundImage: `url("/Gemini_Generated_Image_6hh7cn6hh7cn6hh7.png")` }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-2">
            Artisanat & Design Bois
          </h3>
          <p className="text-lg text-white/90 max-w-lg">
            Gérez vos projets et commandes depuis votre espace professionnel.
          </p>
        </div>
      </div>

    </div>
  );
}