import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(120deg, #f0fdf4 0%, #fce7f3 100%)', // Updated to match HomePage gradient
      fontFamily: 'Segoe UI, Arial, sans-serif' 
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        marginBottom: '1.5rem', 
        color: '#059669' // Updated to use unified green color
      }}>
        Welcome to Our Application
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#334155', 
        marginBottom: '2rem', 
        maxWidth: 500, 
        textAlign: 'center' 
      }}>
        Discover the best way to manage your work and collaborate with your team. Sign up or log in to get started!
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            padding: '0.75rem 2rem', 
            fontSize: '1rem', 
            background: 'linear-gradient(90deg, #f472b6 0%, #be185d 100%)', // Updated to unified pink gradient
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            cursor: 'pointer', 
            fontWeight: 600,
            transition: 'opacity 0.2s'
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Log In
        </button>
        <button 
          onClick={() => navigate('/signup')} 
          style={{ 
            padding: '0.75rem 2rem', 
            fontSize: '1rem', 
            background: 'linear-gradient(90deg, #059669 0%, #047857 100%)', // Updated to unified green gradient
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            cursor: 'pointer', 
            fontWeight: 600,
            transition: 'opacity 0.2s'
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
