import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateUser } from '../../redux/usersSlice';

// Interface pour le typage
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    avatar_url?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const EditUserModal = ({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: User | null }) => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        password: '',
    });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Initialisation des données au chargement de l'utilisateur
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'User',
                password: '',
            });
            // Si l'utilisateur a déjà un avatar, on affiche l'image du serveur
            setPreview(user.avatar ? `http://localhost:8000/storage/${user.avatar}` : null);
        }
    }, [user]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            // On crée une URL locale pour la prévisualisation immédiate
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            
            // Nettoyage automatique de l'ancienne URL de preview
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('role', formData.role);

        // On n'ajoute le mot de passe que s'il est saisi
        if (formData.password.trim() !== '') {
            data.append('password', formData.password);
        }

        // --- CORRECTION : AJOUT DE L'AVATAR AU FORMDATA ---
        if (avatar) {
            data.append('avatar', avatar);
        }

        try {
            await dispatch(updateUser({ id: user.id, formData: data })).unwrap();
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white rounded-3xl p-8 z-10 w-full max-w-md shadow-2xl relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="absolute top-0 left-0 h-1.5 bg-[#A66D3B]"
                        />

                        <h2 className="text-2xl font-bold mb-2 text-[#A66D3B]">Modifier l'utilisateur</h2>
                        <p className="text-gray-500 mb-8 text-sm">Remplissez les informations pour Modifier l'accès.</p>

                        <form onSubmit={handleSubmit}>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {/* Section Avatar */}
                                <motion.div variants={itemVariants} className="flex flex-col items-center mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#A66D3B] transition-colors"
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-2 text-gray-400">
                                                <span className="text-xs font-bold uppercase">Ajouter Photo</span>
                                            </div>
                                        )}
                                    </motion.div>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                        accept="image/*" 
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                               
                                    <input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] transition-all"
                                        required
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                   
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] transition-all"
                                        required
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                  
                                    <input
                                        type="password"
                                        placeholder="Laisser vide pour garder l'ancien"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] transition-all"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] transition-all"
                                    >
                                        <option value="User">Utilisateur</option>
                                        <option value="Editor">Éditeur</option>
                                        <option value="Admin">Administrateur</option>
                                    </select>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex gap-3 pt-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-3 rounded-xl font-medium bg-black border-2 border-black hover:bg-transparent text-white hover:text-black transition-colors"
                                    >
                                        Annuler
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] text-white rounded-xl font-medium shadow-lg   transition-all"
                                    >
                                        Mettre à jour
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditUserModal;