import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import UploadButton from '../components/UploadButton';
import ResultCarousel from '../components/ResultCarousel';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

const Home = () => {
  const [results, setResults] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleQuerySubmit = async (query) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/query`, { query });
      setResults(prevResults => [...prevResults, response.data]);
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  const handleFileSelect = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_BASE_URL}/upload_csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedFileName(file.name);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
      await axios.post(`${API_BASE_URL}/reset`);
      setResults([]);
      setUploadedFileName('');
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
          <ChatBox onQuerySubmit={handleQuerySubmit} />
          <UploadButton onFileSelect={handleFileSelect} />
        </div>
        {uploadedFileName && <p className="mb-4 text-gray-400">Uploaded: {uploadedFileName}</p>}
        <ResultCarousel results={results} />
      </main>

      <footer className="flex justify-end mt-8">
        <button onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          RESET
        </button>
      </footer>
    </div>
  );
};

export default Home;
