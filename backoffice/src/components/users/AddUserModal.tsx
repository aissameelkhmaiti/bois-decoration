import { useState, useRef, useEffect,type ChangeEvent,type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addUser } from '../../redux/usersSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Variantes pour l'apparition décalée des éléments du formulaire
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.05 }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const AddUserModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });
  
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Nettoyage de l'URL de preview pour éviter les fuites de mémoire
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (avatar) data.append('avatar', avatar);

    await dispatch(addUser(data));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10 border border-gray-100"
          >
             <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="absolute top-0 left-0 h-1.5 bg-[#A66D3B]"
                        />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Nouveau profil</h2>
            <p className="text-gray-500 mb-8 text-sm">Remplissez les informations pour créer l'accès.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Avatar avec micro-animation */}
              <motion.div variants={itemVariants} className="flex flex-col items-center mb-2">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#A66D3B] transition-colors group"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <span className="text-[#A66D3B] text-xs font-bold uppercase tracking-wider">Photo</span>
                    </div>
                  )}
                </motion.div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </motion.div>

              {/* Inputs Groupés */}
              {[
                { name: 'name', type: 'text', placeholder: 'Nom complet' },
                { name: 'email', type: 'email', placeholder: 'Email professionnel' },
                { name: 'password', type: 'password', placeholder: 'Mot de passe' },
              ].map((input) => (
                <motion.div key={input.name} variants={itemVariants}>
                  <input
                    {...input}
                    required
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#A66D3B]/30 focus:border-[#A66D3B] transition-all bg-gray-50/50"
                  />
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#A66D3B]/30 bg-gray-50/50"
                >
                  <option value="User">Utilisateur Standard</option>
                  <option value="Admin">Administrateur</option>
                </select>
              </motion.div>

              {/* Actions */}
              <motion.div variants={itemVariants} className="flex gap-4 mt-8">
                <button 
                  type="button" onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-medium bg-black border-2 border-black hover:bg-transparent text-white hover:text-black transition-colors"
                >
                  Annuler
                </button>
                <motion.button 
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  type="submit"
                  className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] text-white rounded-xl font-medium shadow-lg   transition-all"
                >
                  Créer le profil
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;