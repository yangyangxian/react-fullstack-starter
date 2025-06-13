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
    <div style={{
      padding: '2rem',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      <h2 style={{
        color: '#f472b6', // Changed to pink
        marginBottom: '1.5rem',
        fontSize: '2rem',
        fontWeight: 700,
      }}>
        Backend API Data Example
      </h2>
      <p style={{
        color: '#4b5563', // Keep neutral gray for readability
        marginBottom: '1rem',
        fontSize: '1.1rem',
      }}>
        This page demonstrates how to fetch and display data from the backend API.
      </p>
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fce7f3', // Changed to light pink
        borderRadius: '6px',
        border: '1px solid #f9a8d4', // Changed to pink border
      }}>
        <h3 style={{
          color: '#f472b6', // Changed to pink
          marginBottom: '0.5rem',
          fontSize: '1.25rem',
        }}>
          API Data Example
        </h3>
        <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
          <strong><code>/api/hello</code>:</strong> {hello ? hello.message : 'Loading...'}
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
        }}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a name"
            style={{
              padding: '0.5rem 0.75rem',
              fontSize: '1rem',
              border: '1px solid #f9a8d4', // Changed to pink border
              borderRadius: '4px',
              outline: 'none',
              flexGrow: 1,
              maxWidth: '250px',
            }}
          />
          <button type="submit" style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            background: 'linear-gradient(90deg, #f472b6 0%, #be185d 100%)', // Changed to pink gradient
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            Greet
          </button>
        </form>
        {userHello && (
          <p style={{ color: '#4b5563', marginTop: '1rem' }}>
            <strong><code>/api/hello/:name</code>:</strong> {userHello.message}
          </p>
        )}
      </div>
      <p style={{
        marginTop: '2rem',
        color: '#6b7280',
        fontSize: '0.9rem',
      }}>
        This page showcases fetching data from <code>/api/hello</code> and <code>/api/hello/:name</code>.
      </p>
    </div>
  );
}

export default APIDataExamplePage;
