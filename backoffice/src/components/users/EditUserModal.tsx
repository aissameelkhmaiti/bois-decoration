import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateUser } from '../../redux/usersSlice';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status?: 'actif' | 'inactif';
    avatar?: string;
}

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const EditUserModal = ({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: User | null }) => {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        status: 'actif',
        password: '',
    });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'User',
                status: user.status || 'actif',
                password: '',
            });
            setPreview(user.avatar ? `http://localhost:8000/storage/${user.avatar}` : null);
        }
    }, [user]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('role', formData.role);
        data.append('status', formData.status);

        if (formData.password.trim() !== '') {
            data.append('password', formData.password);
        }
        if (avatar) {
            data.append('avatar', avatar);
        }

        try {
            await dispatch(updateUser({ id: user.id, formData: data })).unwrap();
            onClose();
        } catch (error) {
            console.error("Erreur mise à jour:", error);
        }
    };

    const inputClass = "w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0" />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden" animate="visible" exit="exit"
                        className="bg-white rounded-3xl p-8 z-10 w-full max-w-2xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#A66D3B]" />

                        <h2 className="text-2xl font-bold text-gray-800">Modifier le profil</h2>
                        <p className="text-gray-500 mb-6 text-sm">Mettez à jour les accès de l'utilisateur.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Section Avatar */}
                            <motion.div variants={itemVariants} className="flex justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:border-[#A66D3B] transition-all"
                                >
                                    {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold text-gray-400">PHOTO</span>}
                                </motion.div>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                            </motion.div>

                            {/* Grille de champs (2 par ligne sur desktop) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={itemVariants}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block ml-1">Nom complet</label>
                                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} required />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block ml-1">Email</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} required />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block ml-1">Rôle</label>
                                    <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className={inputClass}>
                                        <option value="User">Utilisateur</option>
                                        <option value="Editor">Éditeur</option>
                                        <option value="Admin">Administrateur</option>
                                    </select>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block ml-1">Statut</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'actif' | 'inactif' })} className={inputClass}>
                                        <option value="actif">Actif</option>
                                        <option value="inactif">Inactif</option>
                                    </select>
                                </motion.div>

                                <motion.div variants={itemVariants} className="md:col-span-2">
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block ml-1">Mot de passe (optionnel)</label>
                                    <input type="password" placeholder="Laisser vide pour ne pas modifier" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className={inputClass} />
                                </motion.div>
                            </div>

                            {/* Actions */}
                            <motion.div variants={itemVariants} className="flex gap-4 pt-2">
                                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-medium border-2 border-black hover:bg-black hover:text-white transition-all">
                                    Annuler
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] text-white rounded-xl font-medium shadow-lg hover:bg-transparent hover:text-[#A66D3B] transition-all">
                                    Mettre à jour
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EditUserModal;