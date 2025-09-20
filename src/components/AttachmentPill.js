import React from 'react';

const AttachmentPill = ({ icon, text, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-700/50 rounded-full px-3 py-1.5 text-sm text-gray-200 animate-fade-in">
      <span role="img" aria-label="attachment-icon" className="mr-2">{icon}</span>
      <span>{text}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 text-gray-400 hover:text-white focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default AttachmentPill;
