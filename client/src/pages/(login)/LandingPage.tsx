import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#222d3b' }}>Welcome to Our Application</h1>
      <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '2rem', maxWidth: 500, textAlign: 'center' }}>
        Discover the best way to manage your work and collaborate with your team. Sign up or log in to get started!
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/login')} style={{ padding: '0.75rem 2rem', fontSize: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Log In</button>
        <button onClick={() => navigate('/signup')} style={{ padding: '0.75rem 2rem', fontSize: '1rem', background: '#64748b', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Sign Up</button>
      </div>
    </div>
  );
}

export default LandingPage;
