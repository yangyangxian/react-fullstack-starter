import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" required 
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" 
          />
          <input type="password" placeholder="Password" required 
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" 
          />
          <button 
            type="submit" 
            className="p-3 bg-green-600 text-white border-none rounded-lg font-semibold text-base cursor-pointer hover:bg-green-700 transition-colors"
          >
            Log In
          </button>
        </form>
        <button 
          onClick={() => navigate('/signup')} 
          className="mt-6 bg-transparent border-none text-green-600 cursor-pointer text-base hover:underline w-full text-center"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
