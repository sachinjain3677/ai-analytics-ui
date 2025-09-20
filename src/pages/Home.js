import React, { useState, useEffect } from 'react';
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
import AttachmentPill from '../components/AttachmentPill';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const API_BASE_URL = 'http://localhost:8000';

const Home = () => {
  const [results, setResults] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [resetToken, setResetToken] = useState(0);

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

      if (uploadedFile) {
        console.log('Uploading file context...', uploadedFile.name);
        const formData = new FormData();
        formData.append('file', uploadedFile);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('File context uploaded successfully (simulated).');
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

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleRemoveAudio = () => {
    setRecordedAudio(null);
  };

  const handleExport = async () => {
    // This is a dummy implementation
    console.log("Exporting report...");
  };

  const handleReset = async () => {
    console.log('Resetting session (simulated).');
    setResults([]);
    setUploadedFile(null);
    setRecordedAudio(null);
    setResetToken(prev => prev + 1);
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Your Personal AI-BI Tool
        </h1>
        <p className="my-6 max-w-2xl text-center text-lg font-medium leading-relaxed md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed text-gray-200">
          Upload a CSV, record your voice, or type a query to get instant insights and visualizations.
        </p>
        
        <div className="w-full mt-8">
          <div className="flex items-center mb-4 w-full">
            <ChatBox onQuerySubmit={handleQuerySubmit} uploadedFile={uploadedFile} recordedAudio={recordedAudio} isSubmitting={isSubmitting} resetToken={resetToken} />
            <UploadButton onFileSelect={handleFileSelect} />
          </div>
          <AIVoiceInput onAudioSubmit={handleAudioSubmit} />

          <div className="flex items-center justify-center gap-4 my-4 h-10">
            {uploadedFile && (
              <AttachmentPill 
                icon="📎" 
                text={uploadedFile.name} 
                onRemove={handleRemoveFile} 
              />
            )}
            {recordedAudio && (
              <AttachmentPill 
                icon="🎤" 
                text="Recorded Audio" 
                onRemove={handleRemoveAudio} 
              />
            )}
          </div>

          <ResultCarousel results={results} />
        </div>

        <div className="flex items-center gap-4 mt-8">
          <motion.button
            onClick={handleExport}
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            EXPORT
          </motion.button>
          <motion.button
            onClick={handleReset}
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-red-950/20 px-4 py-2 text-gray-50 transition-colors hover:bg-red-950/50"
          >
            RESET ANALYSIS
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Home;
