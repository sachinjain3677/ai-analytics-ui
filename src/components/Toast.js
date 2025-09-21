import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-900/80' : 'bg-green-900/80';
  const borderColor = type === 'error' ? 'border-red-700/50' : 'border-green-700/50';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white ${bgColor} ${borderColor} border backdrop-blur-sm z-50`}
        >
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
