import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ result, onResultClick }) => {
  return (
        <motion.div 
      onClick={() => onResultClick(result)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 m-2 flex-shrink-0 w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 transition-all duration-300 hover:bg-white/15 hover:border-white/30 shadow-2xl hover:shadow-white/10 flex flex-col"
    >
      <div className="relative aspect-w-4 aspect-h-3 w-full">
                <img src={result.image_url} alt="Generated graph" className="rounded-lg object-cover absolute inset-0 w-full h-full shadow-lg" />
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 mt-3 flex-grow flex flex-col justify-center">
                <p className="text-white font-medium text-sm leading-relaxed">{result.insight}</p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
