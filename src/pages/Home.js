import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

import ChatBox from '../components/ChatBox';
import UploadButton from '../components/UploadButton';
import ResultCarousel from '../components/ResultCarousel';
import { AIVoiceInput } from '../components/ui/ai-voice-input';
import { GradualSpacing } from '../components/ui/gradual-spacing';
import { BasicDemo as TextLoopDemo } from '../components/ui/text-loop-demo';
import AttachmentPill from '../components/AttachmentPill';
import ResultModal from '../components/ResultModal';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Toast from '../components/Toast';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const API_BASE_URL = 'http://localhost:8000';

const Home = () => {
  const [results, setResults] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sessionFiles, setSessionFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [resetToken, setResetToken] = useState(0);
  const [selectedResult, setSelectedResult] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleQuerySubmit = async (query) => {
    setIsSubmitting(true);
    try {
      const audioToSubmit = recordedAudio;
      const newResults = [];

      const successfullyUploadedFiles = [];
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          console.log(`Uploading file: ${file.name}...`);
          const response = await axios.post(`${API_BASE_URL}/upload_csv`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status === 200) {
            console.log(`File ${file.name} uploaded successfully.`);
            successfullyUploadedFiles.push(file);
          }
        } catch (uploadError) {
          console.error(`Failed to upload ${file.name}:`, uploadError);
          setToast({ message: `Error uploading ${file.name}. Please try again.`, type: 'error' });
        }
      }

      if (successfullyUploadedFiles.length > 0) {
        setSessionFiles(prevFiles => {
          const newFiles = successfullyUploadedFiles.filter(
            newFile => !prevFiles.some(existingFile => existingFile.name === newFile.name)
          );
          return [...prevFiles, ...newFiles];
        });
      }

      const audioQueryPromise = async () => {
        if (audioToSubmit) {
          console.log('Sending audio query...', audioToSubmit);
          await new Promise(resolve => setTimeout(resolve, 1000));
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
          await new Promise(resolve => setTimeout(resolve, 1000));
          return {
            image_url: `https://picsum.photos/seed/${Math.random()}/400/300`,
            insight: `This is a dummy insight for the query: "${query}"`,
          };
        }
        return null;
      };

      const [audioResult, textResult] = await Promise.all([audioQueryPromise(), textQueryPromise()]);

      if (audioResult) newResults.push(audioResult);
      if (textResult) newResults.push(textResult);

      if (newResults.length > 0) {
        setResults(prevResults => [...prevResults, ...newResults]);
      }
    } catch (error) {
      console.error('An error occurred during submission:', error);
    } finally {
      setUploadedFiles([]);
      setRecordedAudio(null);
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (newFiles) => {
    const filesToAdd = Array.from(newFiles).filter(newFile => 
      !uploadedFiles.some(existingFile => existingFile.name === newFile.name)
    );
    setUploadedFiles(prevFiles => [...prevFiles, ...filesToAdd]);
  };

  const handleAudioSubmit = (audioBlob) => {
    setRecordedAudio(audioBlob);
    console.log("Audio recorded:", audioBlob);
  };

  const handleRemoveFile = (fileName) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const handleRemoveAudio = () => {
    setRecordedAudio(null);
  };

  const handleExport = async () => {
    if (results.length === 0) {
      alert("There are no results to export.");
      return;
    }

    console.log("Starting export process...");
    const zip = new JSZip();

    try {
      await Promise.all(results.map(async (result, index) => {
        const folder = zip.folder(`Analysis${index + 1}`);
        
        // Add the insight text file
        folder.file("insight.txt", result.insight);

        // Fetch the image, handle potential CORS issues by routing through a proxy if needed
        // For picsum.photos, a direct fetch should work.
        try {
          const response = await fetch(result.image_url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const imageBlob = await response.blob();
          folder.file("image.jpeg", imageBlob);
        } catch (error) {
          console.error(`Failed to fetch image for Analysis${index + 1}:`, error);
          folder.file("image_error.txt", `Could not download image from: ${result.image_url}`);
        }
      }));

      // Generate the zip file and trigger a download
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "ai-analysis-export.zip");
      console.log("Export completed successfully.");

    } catch (error) {
      console.error("An error occurred during the export process:", error);
      alert("An error occurred while creating the zip file.");
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  const handleReset = async () => {
    try {
      console.log('Sending reset request to backend...');
      const response = await axios.post(`${API_BASE_URL}/reset`);

      if (response.status === 200) {
        console.log('Backend reset successful. Clearing UI.');
        setResults([]);
        setUploadedFiles([]);
        setSessionFiles([]);
        setRecordedAudio(null);
        setResetToken(prev => prev + 1);
      } else {
        console.error('Backend reset failed with status:', response.status);
        setToast({ message: 'Failed to reset analysis. Server responded unexpectedly.', type: 'error' });
      }
    } catch (error) {
      console.error('An error occurred during reset:', error);
      setToast({ message: 'Failed to reset analysis. Please try again.', type: 'error' });
    }
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center w-full mx-auto px-4 sm:px-6 lg:px-8 min-w-[1300px]">
        <GradualSpacing
          className="font-display bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl md:text-7xl md:leading-[5rem]"
          text="Your Personal AI-BI Tool"
        />
        <AnimatePresence>
          {!selectedResult && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <div className="my-6">
                <TextLoopDemo />
              </div>
              
              <div className="w-full mt-8">
                <div className="flex items-center justify-center w-full max-w-4xl mx-auto mb-4">
                  <ChatBox onQuerySubmit={handleQuerySubmit} uploadedFile={uploadedFiles.length > 0} recordedAudio={recordedAudio} isSubmitting={isSubmitting} resetToken={resetToken} border={border} boxShadow={boxShadow} />
                  <UploadButton onFileSelect={handleFileSelect} border={border} boxShadow={boxShadow} uploadedFiles={sessionFiles} />
                </div>
                <AIVoiceInput onAudioSubmit={handleAudioSubmit} />
                
                <div className="flex items-center justify-center gap-4 my-4 h-10">
                  {uploadedFiles.map(file => (
                    <AttachmentPill 
                      key={file.name}
                      icon="📎" 
                      text={file.name} 
                      onRemove={() => handleRemoveFile(file.name)}
                    />
                  ))}
                  {recordedAudio && (
                    <AttachmentPill 
                      icon="🎤" 
                      text="Recorded Audio" 
                      onRemove={handleRemoveAudio}
                    />
                  )}
                </div>

                <ResultCarousel results={results} onResultClick={handleResultClick} />
              </div>

              <div className="flex items-center gap-4 mt-8">
                <motion.button
                  onClick={handleExport}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-800/60 border border-gray-600/50 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-800/80"
                >
                  EXPORT
                </motion.button>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative flex w-fit items-center gap-1.5 rounded-full bg-red-900/60 border border-red-700/50 px-4 py-2 text-gray-50 transition-colors hover:bg-red-900/80"
                >
                  RESET ANALYSIS
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <ResultModal 
        result={selectedResult} 
        onClose={handleCloseModal} 
        border={border} 
        boxShadow={boxShadow} 
      />

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </motion.section>
  );
};

export default Home;
