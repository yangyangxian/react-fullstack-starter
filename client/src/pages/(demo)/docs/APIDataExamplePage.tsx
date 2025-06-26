import { useEffect, useState } from 'react';
import { HelloResDto, UserResDto, ApiErrorResponse, ErrorCodes } from '@fullstack/common';
import { apiClient } from '@/utils/APIClient';
import { getErrorMessage } from '@/resources/errorMessages';

function APIDataExamplePage() {
  const [hello, setHello] = useState<HelloResDto | null>(null);
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userData, setUserData] = useState<UserResDto | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<HelloResDto>('/api/hello')
      .then((data: HelloResDto) => setHello(data))
      .catch((apiError: ApiErrorResponse) => {
        console.error('Error fetching /api/hello:', apiError);
        const errorMessage = apiError?.code
          ? getErrorMessage(apiError.code as ErrorCodes)
          : 'Failed to load';
        setHello({ message: `Error: ${errorMessage}` });
      });
  }, []);

  const handleUserEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmailInput(e.target.value);
  };

  const handleGetUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmailInput) {
      setUserError('Please enter a user email.');
      setUserData(null);
      return;
    }
    setUserError(null);
    setUserData(null);

    apiClient.get<UserResDto>(`/api/users/email/${encodeURIComponent(userEmailInput)}`)
      .then((data: UserResDto) => {
        setUserData(data);
      })
      .catch((error: ApiErrorResponse) => {
        console.error('Error fetching /api/users/email/:email', error);
        if (error?.code) {
          setUserError(getErrorMessage(error.code as ErrorCodes));
        } else {
          setUserError('Failed to fetch user data.');
        }
      });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-2xl mx-auto my-8">
      <h2 className="text-pink-500 mb-6 text-3xl font-bold">
        Backend API Data Example
      </h2>
      <p className="text-gray-600 mb-4 text-lg">
        This page demonstrates how to fetch and display user data from the backend API by email address.
      </p>

      <div className="mt-8">
        <h3 className="text-pink-500 mb-4 text-2xl font-semibold">
          API Example
        </h3>
        <p className="text-gray-700 mb-4">
          <strong><code>/api/hello</code>:</strong> {hello ? hello.message : 'Loading...'}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-pink-500 mb-4 text-2xl font-semibold">
          Fetch User by Email Example
        </h3>
        <form onSubmit={handleGetUserSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
          <input
            type="email"
            value={userEmailInput}
            onChange={handleUserEmailInputChange}
            placeholder="Enter User Email (e.g., alice@demo.com)"
            className="p-3 text-base border border-gray-300 rounded-lg outline-none w-full sm:w-auto flex-grow sm:flex-grow-0 sm:max-w-xs focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors duration-150"
          />
          <button
            type="submit"
            className="p-3 text-base bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-none rounded-lg cursor-pointer transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            Get User Data
          </button>
        </form>
        {userError && (
          <p className="text-red-500 mt-4">
            <strong>Error:</strong> {userError}
          </p>
        )}
        {userData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow text-left">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">User Details:</h4>
            <p className="text-gray-700"><strong>Name:</strong> {userData.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
          </div>
        )}
      </div>

      <p className="mt-12 text-gray-500 text-sm border-t border-gray-200 pt-8">
        This page showcases fetching data from <code>/api/hello</code> and <code>/api/users/email/:email</code>.
      </p>
    </div>
  );
}

export default APIDataExamplePage;
