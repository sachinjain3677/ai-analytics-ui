import React, { useRef } from 'react';

// Placeholder for Upload icon
const UploadIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>;

const UploadButton = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset the input value to allow re-uploading the same file.
    e.target.value = null;
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="p-2 text-gray-400 bg-gray-800 rounded-lg hover:text-white hover:bg-gray-700"
      >
        <UploadIcon />
      </button>
    </>
  );
};

export default UploadButton;
