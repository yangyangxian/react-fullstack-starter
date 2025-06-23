import { useNavigate } from 'react-router-dom';
import { DOCS_PATH } from '@/routes/routeConfig';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-pink-100">
      <h1 className="text-4xl font-bold mb-6 text-green-600">
        Welcome to Our Fullstack starter
      </h1>
      <p className="text-lg text-slate-700 mb-8 max-w-md text-center">
        A comprehensive fullstack development environment with React frontend, Node.js backend and complete authentication system. Change this page to start building your application!
      </p>
      <div>
        <button 
          onClick={() => navigate(DOCS_PATH)} 
          className="py-3 px-8 text-base bg-gradient-to-r from-green-600 to-green-700 text-white border-none rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-90"
        >
          View Demo Documentation
        </button>
      </div>
    </div>
  );
}

export default HomePage;
