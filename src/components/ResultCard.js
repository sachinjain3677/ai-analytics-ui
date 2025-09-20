import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ imageUrl, insight }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 m-2 flex-shrink-0 w-80 transition-all duration-300 hover:bg-white/15 hover:border-white/30 shadow-2xl hover:shadow-white/10"
    >
      <div className="relative">
        <img src={imageUrl} alt="Generated graph" className="rounded-lg mb-3 w-full shadow-lg" />
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
        <p className="text-white font-medium text-sm leading-relaxed">{insight}</p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
