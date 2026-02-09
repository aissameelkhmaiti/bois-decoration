import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence,type Variants } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { createProject, fetchProjects } from '../../redux/projectsSlice';
import { fetchCategories } from '../../redux/categoriesSlice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.98, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1], 
      staggerChildren: 0.08 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98, 
    y: 10, 
    transition: { 
      duration: 0.2 
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const AddProjectModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  
  const { data: categoriesData, status, error } = useAppSelector((state) => state.categories);
// Create a helper variable to get the actual array safely
const categories = categoriesData?.data || [];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    category_id: '',
  });


  console.log(categories)

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && status === 'idle') dispatch(fetchCategories());
  }, [isOpen, status, dispatch]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      imagesPreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, [coverPreview, imagesPreview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setImagesPreview(prev => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) return alert('Veuillez sélectionner une catégorie');
    
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (coverImage) data.append('cover_image', coverImage);
    images.forEach((img) => data.append('images[]', img));

    try {
      await dispatch(createProject(data)).unwrap();
      // Rafraîchir la liste des projets après la création
      await dispatch(fetchProjects({}))
      onClose();
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', client: '', category_id: '' });
    setCoverImage(null);
    setCoverPreview(null);
    setImages([]);
    setImagesPreview([]);
  };

  const inputStyle = "w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:border-[#A66D3B] focus:outline-none focus:ring-0 outline-none transition-all bg-gray-50/50";
  const labelStyle = "block text-[13px] font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-md"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white rounded-[2rem] w-full max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative z-10 border border-gray-100 flex flex-col max-h-[92vh]"
          >
            {/* Header avec barre d'accentuation */}
            <div className="relative px-10 pt-10 pb-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#A66D3B] rounded-b-full" />
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Nouveau Projet</h2>
                  <p className="text-gray-500 mt-1 font-medium">Configurez les détails et visuels de votre réalisation.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-10 pb-10 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Section Informations */}
                <div className="col-span-2 md:col-span-1 space-y-5">
                  <motion.div variants={itemVariants}>
                    <label className={labelStyle}>Titre du projet</label>
                    <input type="text" name="title" placeholder="ex: Villa Riviera" value={formData.title} onChange={handleChange} required className={inputStyle} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={labelStyle}>Client</label>
                    <input type="text" name="client" placeholder="ex: Groupe Immobilier" value={formData.client} onChange={handleChange} required className={inputStyle} />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className={labelStyle}>Catégorie</label>
                    <select name="category_id" value={formData.category_id} onChange={handleChange} required className={inputStyle}>
                      <option value="">Sélectionner...</option>
                      {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </motion.div>
                </div>

                {/* Section Description */}
                <div className="col-span-2 md:col-span-1 flex flex-col">
                  <motion.div variants={itemVariants} className="h-full flex flex-col">
                    <label className={labelStyle}>Description détaillée</label>
                    <textarea name="description" placeholder="Décrivez les spécificités du projet..." value={formData.description} onChange={handleChange} required rows={8} className={`${inputStyle} resize-none h-full`} />
                  </motion.div>
                </div>

                {/* Section Images */}
                <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
                  <label className={labelStyle}>Couverture</label>
                  <div 
                    onClick={() => coverInputRef.current?.click()}
                    className="group relative h-48 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-[#A66D3B] hover:bg-[#A66D3B]/5 transition-all overflow-hidden"
                  >
                    {coverPreview ? (
                      <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A66D3B" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5-5l5 5m-5-5v12"/></svg>
                        </div>
                        <span className="text-xs font-bold text-[#A66D3B] uppercase tracking-widest">Upload Cover</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={coverInputRef} onChange={handleCoverChange} className="hidden" accept="image/*" />
                </motion.div>

                <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
                  <label className={labelStyle}>Galerie ({images.length})</label>
                  <div 
                    onClick={() => imagesInputRef.current?.click()}
                    className="h-48 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex items-center justify-center cursor-pointer hover:border-[#A66D3B] p-4 transition-all"
                  >
                    {imagesPreview.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 w-full h-full overflow-y-auto">
                        {imagesPreview.map((url, i) => (
                          <img key={i} src={url} className="h-16 w-full object-cover rounded-lg shadow-sm" alt="" />
                        ))}
                        <div className="h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-[#A66D3B] font-bold">+</div>
                      </div>
                    ) : (
                      <div className="text-center">
                         <span className="text-xs font-bold text-[#A66D3B] uppercase tracking-widest">Ajouter des photos</span>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={imagesInputRef} onChange={handleImagesChange} className="hidden" accept="image/*" multiple />
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 sticky bottom-0 bg-white pt-4">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-medium bg-black border-2 border-black hover:bg-transparent text-white hover:text-black transition-colors">
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] text-white rounded-xl font-medium shadow-lg   transition-all"
                >
                  {isSubmitting ? 'Traitement en cours...' : 'Confirmer la création'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProjectModal;