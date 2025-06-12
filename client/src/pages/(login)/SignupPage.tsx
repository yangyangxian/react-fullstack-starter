import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  // Dummy signup handler
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would set auth state, for now just redirect
    navigate('/');
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#222d3b' }}>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 300 }}>
        <input type="email" placeholder="Email" required style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <input type="password" placeholder="Password" required style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <button type="submit" style={{ padding: '0.75rem', background: '#64748b', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Sign Up</button>
      </form>
      <button onClick={() => navigate('/login')} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '1rem' }}>Already have an account? Log In</button>
    </div>
  );
}

export default SignupPage;
