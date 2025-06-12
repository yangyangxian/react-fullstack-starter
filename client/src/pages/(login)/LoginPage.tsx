import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthContext } from '../../hooks/useAuthProvider';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = getAuthContext();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#222d3b' }}>Log In</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 300 }}>
        <input type="email" placeholder="Email" required style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <input type="password" placeholder="Password" required style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <button type="submit" style={{ padding: '0.75rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Log In</button>
      </form>
      <button onClick={() => navigate('/signup')} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '1rem' }}>Don't have an account? Sign Up</button>
    </div>
  );
}

export default LoginPage;
