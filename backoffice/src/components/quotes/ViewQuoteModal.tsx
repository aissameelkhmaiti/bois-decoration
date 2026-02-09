import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { Skeleton, Stack } from '@mui/material';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  quoteId: number | null;
}

const ViewQuoteModal = ({ isOpen, onClose, quoteId }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval: any;

    if (isOpen && quoteId) {
      const checkStatus = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/quotes/${quoteId}/status`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const data = await response.json();

          if (data.ready) {
            setPdfUrl(data.pdf_url);
            setLoading(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification du PDF", error);
        }
      };

      checkStatus();
      interval = setInterval(checkStatus, 3000);
    }

    return () => {
      clearInterval(interval);
      setPdfUrl(null);
      setLoading(true);
    };
  }, [isOpen, quoteId]);

  if (!isOpen) return null;

  // Composant interne pour le Skeleton "Style Devis"
  const QuoteSkeleton = () => (
    <div className="w-full max-w-3xl bg-white p-12 shadow-sm rounded-sm">
      <Stack spacing={4}>
        <div className="flex justify-between items-start">
          <Skeleton variant="rectangular" width={150} height={60} />
          <Stack alignItems="end">
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" width={180} />
          </Stack>
        </div>
        <Stack spacing={1} className="mt-10">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="30%" />
        </Stack>
        <div className="mt-10">
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
        <div className="flex justify-end mt-4">
          <Skeleton variant="text" width={150} height={40} />
        </div>
      </Stack>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" 
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
          className="bg-[#f8fafc] rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col relative z-10 overflow-hidden shadow-2xl border border-white/20"
        >
          {/* Header Raffiné */}
          <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <PictureAsPdfIcon className="text-[#A66D3B]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
                  Aperçu du Devis
                </h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">
                  Réf: #{quoteId}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-100/50 flex flex-col items-center p-4 md:p-8">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center"
              >
                <QuoteSkeleton />
                <p className="mt-6 text-slate-500 font-medium text-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Préparation du document haute définition...
                </p>
              </motion.div>
            ) : (
              pdfUrl && (
                <motion.iframe 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  src={`${pdfUrl}#view=FitH`} 
                  className="w-full h-full rounded-lg shadow-lg border-none bg-white"
                  title="PDF Quote"
                />
              )
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-between items-center">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-slate-600 font-semibold text-sm hover:bg-slate-50 rounded-xl transition-colors"
            >
              Quitter
            </button>
            
            {!loading && pdfUrl && (
              <div className="flex gap-3">
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#A66D3B] text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 hover:bg-white hover:text-[#A66D3B] transition-all transform hover:-translate-y-0.5"
                >
                  <DownloadIcon fontSize="small" />
                  Télécharger le PDF
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ViewQuoteModal;