import { ROOT_PATH } from '@/routes/routeConfig';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 font-sans text-slate-800">
      <h1 className="text-5xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-lg text-slate-700 mb-8 max-w-md text-center">
        Sorry, the page you are looking for does not exist.<br />
        Please check the URL or return to the <a href={ROOT_PATH} className="text-blue-600 hover:underline">home page</a>.
      </p>
    </div>
  );
}

export default NotFoundPage;
