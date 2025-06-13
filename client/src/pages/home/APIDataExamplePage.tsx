import { useEffect, useState } from 'react';
import { HelloResponse, HelloNameResponse } from '@fullstack/common';
import { getHello, getHelloName } from '../../services/APIClient';

function APIDataExamplePage() {
  const [hello, setHello] = useState<HelloResponse | null>(null);
  const [input, setInput] = useState('');
  const [userHello, setUserHello] = useState<HelloNameResponse | null>(null);

  useEffect(() => {
    getHello()
      .then((data: HelloResponse) => setHello(data))
      .catch((error: unknown) => console.error('Error fetching /api/hello:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    try {
      const data: HelloNameResponse = await getHelloName(input);
      setUserHello(data);
    } catch (error: unknown) {
      console.error('Error fetching /api/hello/:name', error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-2xl mx-auto my-8">
      <h2 className="text-pink-500 mb-6 text-3xl font-bold">
        Backend API Data Example
      </h2>
      <p className="text-gray-600 mb-4 text-lg">
        This page demonstrates how to fetch and display data from the backend API.
      </p>
      {/* Simplified the nested container: removed its own background, padding, and shadow. It now just provides margin. */}
      <div className="mt-8"> 
        <h3 className="text-pink-500 mb-4 text-2xl font-semibold">
          API Data Example
        </h3>
        <p className="text-gray-700 mb-4">
          <strong><code>/api/hello</code>:</strong> {hello ? hello.message : 'Loading...'}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a name"
            className="p-3 text-base border border-gray-300 rounded-lg outline-none w-full sm:w-auto flex-grow sm:flex-grow-0 sm:max-w-xs focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors duration-150"
          />
          <button
            type="submit"
            className="p-3 text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-none rounded-lg cursor-pointer transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            Greet
          </button>
        </form>
        {userHello && (
          <p className="text-gray-700 mt-4">
            <strong><code>/api/hello/:name</code>:</strong> {userHello.message}
          </p>
        )}
      </div>
      <p className="mt-8 text-gray-500 text-sm">
        This page showcases fetching data from <code>/api/hello</code> and <code>/api/hello/:name</code>.
      </p>
    </div>
  );
}

export default APIDataExamplePage;
