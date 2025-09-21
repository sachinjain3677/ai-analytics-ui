import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ResultCard from './ResultCard';

// Placeholder for Left and Right arrow icons
const ChevronLeftIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
const ChevronRightIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;

const ResultCarousel = ({ results }) => {
  const scrollContainerRef = useRef(null);
  const showArrows = results && results.length >= 4;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.flex-shrink-0');
      if (card) {
        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(card);
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        const scrollAmount = cardWidth + marginLeft + marginRight;
        
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className={`flex items-center w-full min-w-[1300px] ${showArrows ? 'justify-between' : 'justify-center'}`}>
      {showArrows && (
        <motion.button 
          onClick={() => scroll('left')} 
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="p-2 rounded-full shadow-md bg-gray-800/60 border border-gray-600/50 hover:bg-gray-800/80 mr-4 flex-shrink-0 transition-colors"
        >
          <ChevronLeftIcon />
        </motion.button>
      )}
      <div 
        ref={scrollContainerRef} 
        className="overflow-x-auto scroll-smooth custom-scrollbar py-4"
              >
        <div className="flex space-x-4 w-full min-w-[1300px]">
          {results && results.map((result, index) => (
            <ResultCard key={index} imageUrl={result.image_url} insight={result.insight} />
          ))}
        </div>
      </div>
      {showArrows && (
        <motion.button 
          onClick={() => scroll('right')} 
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="p-2 rounded-full shadow-md bg-gray-800/60 border border-gray-600/50 hover:bg-gray-800/80 ml-4 flex-shrink-0 transition-colors"
        >
          <ChevronRightIcon />
        </motion.button>
      )}
    </div>
  );
};

export default ResultCarousel;
