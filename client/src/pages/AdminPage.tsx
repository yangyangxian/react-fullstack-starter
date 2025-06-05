import { useEffect, useState } from 'react';
import { HelloResponse, HelloNameResponse } from '@common/hello';

function AdminPage() {
  const [hello, setHello] = useState<HelloResponse | null>(null);
  const [input, setInput] = useState('');
  const [userHello, setUserHello] = useState<HelloNameResponse | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then((data: HelloResponse) => setHello(data));
      console.log('AdminPage mounted, fetching /api/hello' + hello?.message);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const res = await fetch(`/api/hello/${encodeURIComponent(input)}`);
    const data: HelloNameResponse = await res.json();
    setUserHello(data);
  };

  return (
    <div>
      <h2>Welcome to the Admin Page!</h2>
      <div>
        <strong>API /api/hello:</strong> {hello ? hello.message : 'Loading...'}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your name"
          style={{
            padding: '10px 16px',
            fontSize: 18,
            border: '1px solid #ccc',
            borderRadius: 6,
            outline: 'none',
            marginRight: 8,
            minWidth: 180
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 24px',
            fontSize: 18,
            background: 'linear-gradient(90deg, #61dafb 0%, #007cf0 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#007cf0')}
          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #61dafb 0%, #007cf0 100%)')}
        >
          Say Hello
        </button>
      </form>
      {userHello && (
        <div style={{
          marginTop: 16,
          padding: '16px 24px',
          background: 'linear-gradient(90deg, #e0f7fa 0%, #b2ebf2 100%)',
          color: '#007cf0',
          borderRadius: 8,
          fontSize: 20,
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'inline-block',
          minWidth: 220,
          textAlign: 'center',
          letterSpacing: 0.5,
        }}>
          {userHello.message}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
