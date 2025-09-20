import React from 'react';
import { motion } from 'framer-motion';

const AttachmentPill = ({ icon, text, onRemove }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center bg-gray-800/60 border border-gray-600/50 rounded-full px-3 py-1.5 text-sm text-gray-200"
    >
      <span role="img" aria-label="attachment-icon" className="mr-2">{icon}</span>
      <span>{text}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 text-gray-400 hover:text-white focus:outline-none"
      >
        &times;
      </button>
    </motion.div>
  );
};

export default AttachmentPill;
