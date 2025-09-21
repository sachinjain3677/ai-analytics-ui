import React from 'react';
import { motion } from 'framer-motion';
import Plot from 'react-plotly.js';

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
      <div className="relative aspect-w-4 aspect-h-3 w-full bg-gray-900/50 rounded-lg overflow-hidden">
        {result.graph ? (
          <div className="absolute inset-0">
            <Plot
              data={result.graph.data}
              layout={{
                ...result.graph.layout,
                autosize: true,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                font: { color: 'white' },
                margin: { l: 50, r: 20, b: 40, t: 40, pad: 4 }
              }}
              useResizeHandler={true}
              className="w-full h-full"
              config={{ responsive: true, displayModeBar: false }}
            />
          </div>
        ) : (
          <img src={result.image_url} alt="Generated visualization" className="rounded-lg object-cover absolute inset-0 w-full h-full shadow-lg" />
        )}
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 mt-3 flex-grow flex flex-col justify-center">
        {typeof result.insight === 'object' && result.insight.insights ? (
          <ul className="text-white font-medium text-sm leading-relaxed list-disc list-inside space-y-1">
            {result.insight.insights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-white font-medium text-sm leading-relaxed">{result.insight}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
