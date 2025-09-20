import React, { useState } from 'react';

const SendIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const ChatBox = ({ onQuerySubmit, uploadedFile, recordedAudio, isSubmitting }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() && !uploadedFile && !recordedAudio) return;
    onQuerySubmit(query, uploadedFile);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-grow flex items-center bg-gray-800 rounded-lg p-2 mr-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {recordedAudio && <span role="img" aria-label="audio-ready" className="mr-2">🎤</span>}
          {uploadedFile && <span role="img" aria-label="file-ready">📎</span>}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            recordedAudio && uploadedFile ? "Audio and file ready. Add a comment or send."
            : recordedAudio ? "Audio recorded. Add a comment or send."
            : uploadedFile ? "File uploaded. Add a comment or send."
            : "What's on your mind?"
          }
          className={`w-full bg-transparent text-white placeholder-gray-500 focus:outline-none ${
            recordedAudio && uploadedFile ? 'pl-16'
            : recordedAudio || uploadedFile ? 'pl-10'
            : ''
          }`}
        />
      </div>
      <button type="submit" className="p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? <SpinnerIcon /> : <SendIcon />}
      </button>
    </form>
  );
};

export default ChatBox;
