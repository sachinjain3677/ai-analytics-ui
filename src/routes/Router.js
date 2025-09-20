import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BackgroundGradientTest from '../pages/BackgroundGradientTest';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/background-gradient-test" element={<BackgroundGradientTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
