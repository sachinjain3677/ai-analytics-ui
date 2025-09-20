import React from 'react';

const ResultCard = ({ imageUrl, insight }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 m-2 flex-shrink-0 w-80 transform hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt="Generated graph" className="rounded-md mb-4" />
      <p className="text-gray-300">{insight}</p>
    </div>
  );
};

export default ResultCard;
