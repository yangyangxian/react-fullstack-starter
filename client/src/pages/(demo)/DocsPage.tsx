import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { ROOT_PATH, DOCS_PATH, DOCS_NESTED_ROUTES_PATH, DOCS_API_EXAMPLE_PATH } from '../../routes/routeConfig';

function DocsPage() {
  const { logout, user, isLoading } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If we're at exactly /docs (no child route), redirect to the first nested route
  if (location.pathname === DOCS_PATH || location.pathname === DOCS_PATH + '/') {
    return <Navigate to={DOCS_NESTED_ROUTES_PATH} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-100 flex flex-col">
      {/* Fixed top navigation bar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center h-16 px-8">
        <div className="flex gap-6">
          <NavLink
            to={ROOT_PATH}
            className="flex items-center gap-2 py-2 px-3 rounded-md text-sm no-underline text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Home</span>
          </NavLink>
          <NavLink
            to={DOCS_NESTED_ROUTES_PATH}
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
            to={DOCS_API_EXAMPLE_PATH}
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
          {user && (
            <span className="text-slate-700">
              Welcome, {user.name || user.email}!
            </span>
          )}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="py-2 px-4 bg-pink-500 text-white border-none rounded-md text-sm cursor-pointer transition-colors duration-200 hover:bg-pink-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </nav>
      {/* Main content below navbar */}
      <div className="flex flex-col items-center pt-16 flex-grow w-full overflow-y-auto">
        <div className="w-full flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DocsPage;
