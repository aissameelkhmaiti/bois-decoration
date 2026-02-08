import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Animation flottante sur le 404 */}
        <motion.h1 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-9xl font-extrabold text-[#A66D3B] drop-shadow-sm"
        >
          404
        </motion.h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
          Page introuvable
        </h2>
        
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez semble avoir disparu dans le vide numérique.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-block px-8 py-4 bg-[#A66D3B] text-white font-medium rounded-2xl shadow-lg hover:bg-[#8e5a2f] transition-all duration-300"
          >
            Retour au Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;