import { useRoutes, RouteObject } from 'react-router-dom'; // Reverted to useRoutes
import { getDynamicRoutes } from './services/pageRouteGenerator';
import ProtectedRoute from './components/ProtectedRoute';
// AuthProvider is now wrapped in main.tsx, so it's not needed here directly for the routes component.
import NotFoundPage from './pages/NotFoundPage';

function App() { // Renamed App to AppRoutes to avoid confusion if App is used as a layout wrapper
  const dynamicRoutes = getDynamicRoutes();

  const processedRoutes: RouteObject[] = dynamicRoutes.map(route => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  }));

  const hasWildcard = processedRoutes.some(r => r.path === '*');
  if (!hasWildcard) {
    processedRoutes.push({ path: '*', element: <NotFoundPage /> });
  }

  return useRoutes(processedRoutes);
}

export default App; // Exporting the routes component
