import React, { useRef } from 'react';
import ResultCard from './ResultCard';

// Placeholder for Left and Right arrow icons
const ChevronLeftIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
const ChevronRightIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;

const ResultCarousel = ({ results }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center">
      <button onClick={() => scroll('left')} className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full shadow-md hover:bg-gray-700">
        <ChevronLeftIcon />
      </button>
      <div ref={scrollContainerRef} className="flex overflow-x-auto scroll-smooth scrollbar-hide py-4">
        {results && results.map((result, index) => (
          <ResultCard key={index} imageUrl={result.image_url} insight={result.insight} />
        ))}
      </div>
      <button onClick={() => scroll('right')} className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full shadow-md hover:bg-gray-700">
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default ResultCarousel;
