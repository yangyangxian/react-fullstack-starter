import { useRoutes, RouteObject } from 'react-router-dom';
import { getDynamicRoutes } from './utils/dynamicRoutes';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const routes = getDynamicRoutes();
  const processedRoutes = routes.map(route => ({
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
