import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilePopover = ({ files, isVisible, border, boxShadow }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            border,
            boxShadow,
            backdropFilter: 'blur(8px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="absolute bottom-full mb-2 w-max max-w-xs p-3 bg-gray-950/40 rounded-lg"
        >
          <h4 className="text-white font-bold text-sm mb-1 border-b border-gray-600 pb-1">Uploaded Files</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {files.map((file, index) => (
              <li key={index} className="truncate">{file.name}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilePopover;
