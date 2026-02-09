import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addUser } from '../../redux/usersSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

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

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white rounded-3xl p-8 z-10 w-full max-w-2xl shadow-2xl relative overflow-hidden"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="absolute top-0 left-0 w-full h-1.5 bg-[#A66D3B]absolute top-0 left-0 h-1.5 bg-[#A66D3B]" />
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Nouveau profil</h2>
            <p className="text-gray-500 mb-8 text-sm">Remplissez les informations pour créer l'accès.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Avatar Center */}
              <motion.div variants={itemVariants} className="flex flex-col items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#A66D3B] transition-colors"
                >
                  {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-[#A66D3B] text-xs font-bold uppercase">Photo</span>}
                </motion.div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </motion.div>

              {/* Grid System: 2 inputs per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <input name="name" type="text" placeholder="Nom complet" required value={formData.name} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input name="email" type="email" placeholder="Email professionnel" required value={formData.email} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input name="password" type="password" placeholder="Mot de passe" required value={formData.password} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <select name="role" value={formData.role} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none bg-gray-50/50 transition-all">
                    <option value="User">Utilisateur Standard</option>
                    <option value="Admin">Administrateur</option>
                  </select>
                </motion.div>
              </div>

              {/* Actions */}
              <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-medium border-2 border-black hover:bg-black hover:text-white transition-all">
                  Annuler
                </button>
                <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} type="submit"
                  className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] text-white rounded-xl font-medium shadow-lg hover:bg-transparent hover:text-[#A66D3B] transition-all">
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