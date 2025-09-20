import React, { useState } from 'react';

// Placeholder for Microphone and Upload icons
const MicIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>;

const ChatBox = ({ onQuerySubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onQuerySubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow flex items-center bg-gray-800 rounded-lg p-2 mr-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What's on your mind?"
        className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
      />
      <button type="button" className="p-2 text-gray-400 hover:text-white">
        <MicIcon />
      </button>
    </form>
  );
};

export default ChatBox;
