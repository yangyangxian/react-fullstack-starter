import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

function HomePage() {
  const { logout } = useAuth(); // Now using the interface-based hook
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };
  // If we're at exactly / or /home (no child route), redirect to the first nested route
  if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home/') {
    return <Navigate to="/home/nestedroutesguide" replace />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f0fdf4 0%, #fce7f3 100%)', // Updated to green-to-pink gradient
      fontFamily: 'Segoe UI, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
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
            to="/home/nestedroutesguide"
            style={({ isActive }) => ({
              padding: '10px 28px',
              borderRadius: 8,
              background: isActive ? 'linear-gradient(90deg, #059669 0%, #047857 100%)' : 'transparent', // Updated to green gradient
              color: isActive ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: isActive ? '0 2px 8px rgba(5,150,105,0.10)' : 'none', // Updated shadow color
              transition: 'all 0.2s',
            })}
          >
            Nested Routes Guide
          </NavLink>
          <NavLink
            to="/home/apidataexample"
            style={({ isActive }) => ({
              padding: '10px 28px',
              borderRadius: 8,
              background: isActive ? 'linear-gradient(90deg, #f472b6 0%, #be185d 100%)' : 'transparent', // Keep pink gradient
              color: isActive ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: isActive ? '0 2px 8px rgba(190,24,93,0.10)' : 'none',
              transition: 'all 0.2s',
            })}
          >
            API Data Example
          </NavLink>
        </div>
        
        {/* User info and logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#f472b6', // Changed to pink
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#be185d')} // Darker pink on hover
            onMouseOut={e => (e.currentTarget.style.background = '#f472b6')}
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
        paddingTop: 64, // Adjusted to remove extra padding, just space for navbar
        flexGrow: 1,
        width: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}>
        {/* Removed the paper effect container and "Welcome Home!" heading */}
        <div style={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
