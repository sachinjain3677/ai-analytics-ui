import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import UploadButton from '../components/UploadButton';
import ResultCarousel from '../components/ResultCarousel';
import { AIVoiceInput } from '../components/ui/ai-voice-input';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

const Home = () => {
  const [results, setResults] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [resetToken, setResetToken] = useState(0);

  const handleQuerySubmit = async (query) => {
    setIsSubmitting(true);

    try {
      const audioToSubmit = recordedAudio;
      const newResults = [];

      // File upload is a context-setting step, so it happens first.
      if (uploadedFile) {
        console.log('Uploading file context...', uploadedFile.name);
        const formData = new FormData();
        formData.append('file', uploadedFile);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('File context uploaded successfully (simulated).');
      }

      // Process audio and text queries independently.
      const audioQueryPromise = async () => {
        if (audioToSubmit) {
          console.log('Sending audio query...', audioToSubmit);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
          return {
            image_url: `https://picsum.photos/seed/${Math.random()}/400/300`,
            insight: 'This is a dummy insight from the recorded audio.',
          };
        }
        return null;
      };

      const textQueryPromise = async () => {
        if (query.trim()) {
          console.log('Sending text query...', query);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
          return {
            image_url: `https://picsum.photos/seed/${Math.random()}/400/300`,
            insight: `This is a dummy insight for the query: "${query}"`,
          };
        }
        return null;
      };

      const [audioResult, textResult] = await Promise.all([
        audioQueryPromise(),
        textQueryPromise(),
      ]);

      if (audioResult) newResults.push(audioResult);
      if (textResult) newResults.push(textResult);

      if (newResults.length > 0) {
        setResults(prevResults => [...prevResults, ...newResults]);
      }

    } catch (error) {
      console.error('An error occurred during submission:', error);
    } finally {
      // Clear all inputs after submission
      setUploadedFile(null);
      setRecordedAudio(null);
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  const handleAudioSubmit = (audioBlob) => {
    setRecordedAudio(audioBlob);
    console.log("Audio recorded:", audioBlob);
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/export`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // or 'report.csv'
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const handleReset = async () => {
    try {
      // DUMMY RESET: Replace with your actual endpoint call
      // await axios.post(`${API_BASE_URL}/reset_db`);
      console.log('Resetting DB tables (simulated).');

      setResults([]);
      setUploadedFile(null);
      setRecordedAudio(null);
      setResetToken(prev => prev + 1); // Trigger the reset in the ChatBox
    } catch (error) {
      console.error('Error resetting session:', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex flex-col">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI-BI</h1>
        <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          EXPORT
        </button>
      </header>

      <main className="flex-grow flex flex-col">
        <div className="flex items-center mb-8">
          <ChatBox onQuerySubmit={handleQuerySubmit} uploadedFile={uploadedFile} recordedAudio={recordedAudio} isSubmitting={isSubmitting} resetToken={resetToken} />
          <UploadButton onFileSelect={handleFileSelect} />
        </div>
        <AIVoiceInput onAudioSubmit={handleAudioSubmit} />
        {uploadedFile && <p className="mb-4 text-gray-400">Uploaded: {uploadedFile.name}</p>}
        <ResultCarousel results={results} />
      </main>

      <footer className="flex justify-end mt-8">
        <button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          RESET ANALYSIS
        </button>
      </footer>
    </div>
  );
};

export default Home;
