import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-pink-100 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-green-600">
        Welcome to Our Application
      </h1>
      <p className="text-lg text-slate-700 mb-8 max-w-md text-center">
        Discover the best way to manage your work and collaborate with your team. Sign up or log in to get started!
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/login')} 
          className="py-3 px-8 text-base bg-gradient-to-r from-pink-500 to-pink-700 text-white border-none rounded-lg cursor-pointer font-semibold transition-opacity duration-200 hover:opacity-90"
        >
          Log In
        </button>
        <button 
          onClick={() => navigate('/signup')} 
          className="py-3 px-8 text-base bg-gradient-to-r from-green-600 to-green-700 text-white border-none rounded-lg cursor-pointer font-semibold transition-opacity duration-200 hover:opacity-90"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
