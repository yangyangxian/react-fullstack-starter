import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAuthContext } from '../hooks/useAuthProvider';

function HomePage() {
  const { logout } = getAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      {/* Fixed top navigation bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        padding: '0 2rem',
      }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <NavLink
            to="/home/test"
            style={({ isActive }) => ({
              padding: '10px 28px',
              borderRadius: 8,
              background: isActive ? 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)' : 'transparent',
              color: isActive ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.10)' : 'none',
              transition: 'all 0.2s',
            })}
          >
            Test
          </NavLink>
          <NavLink
            to="/home/admin"
            style={({ isActive }) => ({
              padding: '10px 28px',
              borderRadius: 8,
              background: isActive ? 'linear-gradient(90deg, #f472b6 0%, #be185d 100%)' : 'transparent',
              color: isActive ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: isActive ? '0 2px 8px rgba(190,24,93,0.10)' : 'none',
              transition: 'all 0.2s',
            })}
          >
            Admin
          </NavLink>
        </div>
        
        {/* User info and logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#dc2626')}
            onMouseOut={e => (e.currentTarget.style.background = '#ef4444')}
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Main content below navbar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: 96, // space for navbar
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '40px 48px',
          minWidth: 380,
          maxWidth: 520,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: 12,
            letterSpacing: 0.5,
          }}>
            Welcome Home!
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            marginBottom: 32,
            textAlign: 'center',
            maxWidth: 400,
          }}>
            This is your dashboard. Use the navigation above to explore features and manage your work.
          </p>
          <div style={{ width: '100%' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
