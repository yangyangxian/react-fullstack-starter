import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCS_PATH, LOGIN_PATH } from '../../../routes/routeConfig';

function SignupPage() {
  const navigate = useNavigate();
  // Dummy signup handler
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would set auth state, for now just redirect
    navigate(DOCS_PATH);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" required 
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          <input type="password" placeholder="Password" required 
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          <button
            type="submit"
            className="p-3 bg-slate-600 text-white border-none rounded-lg font-semibold text-base cursor-pointer hover:bg-slate-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={() => navigate(LOGIN_PATH)}
          className="mt-6 bg-transparent border-none text-blue-600 cursor-pointer text-base hover:underline w-full text-center"
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
