import React, { useState } from 'react';

const SendIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const ChatBox = ({ onQuerySubmit, uploadedFile, isSubmitting }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() && !uploadedFile) return;
    onQuerySubmit(query, uploadedFile);
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
      <button type="submit" className="p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? <SpinnerIcon /> : <SendIcon />}
      </button>
    </form>
  );
};

export default ChatBox;
