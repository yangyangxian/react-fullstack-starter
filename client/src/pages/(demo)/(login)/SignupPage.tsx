import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCS_PATH, LOGIN_PATH } from '@/routes/routeConfig';
import { useAuth } from '@/providers/AuthProvider';

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    setError('');
    try {
      await signup(email, password);
      navigate(DOCS_PATH);
    } catch (err: any) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <div className="p-8 bg-white shadow-xl rounded-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Sign Up</h2>
        {error && (
          <div className="text-sm mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isSigningUp}
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isSigningUp}
            className="p-3 rounded-md border border-slate-300 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={isSigningUp}
            className="p-3 bg-slate-600 text-white border-none rounded-lg font-semibold text-base cursor-pointer hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isSigningUp ? 'Signing up...' : 'Sign Up'}
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
