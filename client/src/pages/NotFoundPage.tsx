
function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      color: '#222d3b',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '2rem', maxWidth: 500, textAlign: 'center' }}>
        Sorry, the page you are looking for does not exist.<br />
        Please check the URL or return to the <a href="/">home page</a>.
      </p>
    </div>
  );
}

export default NotFoundPage;
