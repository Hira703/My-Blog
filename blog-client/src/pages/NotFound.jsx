import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assets/lotties/Animation - 1749821949650.json'; // adjust path to your Lottie file

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 text-center">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '320px', width: '320px' }}
      />

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
