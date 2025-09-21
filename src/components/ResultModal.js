import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultModal = ({ result, onClose, border, boxShadow }) => {
  if (!result) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose} // Click on the overlay closes the modal
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ border, boxShadow }}
          className="relative bg-gray-950/40 rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          <div className="p-2">
            <img 
              src={result.image_url} 
              alt="Insight visualization" 
              className="w-full h-auto object-cover rounded-xl" 
            />
          </div>
          <div className="p-6 pt-4 text-center">
            <p className="text-gray-300 text-lg">{result.insight}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultModal;
