import { useRoutes, RouteObject } from 'react-router-dom'; 
import { getDynamicRoutes } from '@/routes/pageRouteGenerator';
import ProtectedRoute from '@/components/ProtectedRoute';
// AuthProvider is now wrapped in main.tsx, so it's not needed here directly for the routes component.
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
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

export default App;
