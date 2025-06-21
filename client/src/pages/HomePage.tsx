import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

function HomePage() {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // If we're at exactly / or /home (no child route), redirect to the first nested route
  if (location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home/') {
    return <Navigate to="/home/nestedroutesguide" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-100 flex flex-col">
      {/* Fixed top navigation bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center h-16 px-8">
        <div className="flex gap-6">
          <NavLink
            to="/home/nestedroutesguide"
            className={({ isActive }) => {
              const commonClasses = "py-2 px-6 rounded-lg text-lg no-underline transition-colors duration-200 ease-in-out";
              if (isActive) {
                return `${commonClasses} bg-green-600 text-white`;
              }
              return `${commonClasses} bg-transparent text-slate-700 hover:bg-green-50`;
            }}
          >
            Nested Routes Guide
          </NavLink>
          <NavLink
            to="/home/apidataexample"
            className={({ isActive }) => {
              const commonClasses = "py-2 px-6 rounded-lg text-lg no-underline transition-colors duration-200 ease-in-out";
              if (isActive) {
                return `${commonClasses} bg-pink-500 text-white`;
              }
              return `${commonClasses} bg-transparent text-slate-700 hover:bg-pink-50`;
            }}
          >
            API Data Example
          </NavLink>
        </div>

        {/* User info and logout */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-pink-500 text-white border-none rounded-md text-sm cursor-pointer transition-colors duration-200 hover:bg-pink-700"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Main content below navbar */}
      <div className="flex flex-col items-center pt-16 flex-grow w-full overflow-y-auto">
        {/* Removed the paper effect container and "Welcome Home!" heading */}
        <div className="w-full flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
