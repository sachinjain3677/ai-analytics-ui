import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ imageUrl, insight }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/60 border border-gray-600/50 rounded-lg p-2 m-2 flex-shrink-0 w-80 transition-colors hover:bg-gray-800/80"
    >
      <img src={imageUrl} alt="Generated graph" className="rounded-md mb-2" />
      <p className="text-gray-300">{insight}</p>
    </motion.div>
  );
};

export default ResultCard;
