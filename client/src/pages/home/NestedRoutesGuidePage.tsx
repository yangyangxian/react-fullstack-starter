function NestedRoutesGuidePage() {
  return (
    <div style={{
      padding: '2rem',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'left',
      maxWidth: '800px',
      margin: '2rem auto'
    }}>
      <h1 style={{
        color: '#059669',
        marginBottom: '1.5rem',
        fontSize: '2rem',
        fontWeight: 700,
        textAlign: 'center',
      }}>
        Nested Routes Developer Guide
      </h1>
      
      <p style={{
        color: '#4b5563',
        marginBottom: '2rem',
        fontSize: '1.1rem',
        textAlign: 'center',
      }}>
        Learn how to implement nested routes in this React fullstack application using our dynamic routing system.
      </p>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #d1fae5',
      }}>
        <h2 style={{ color: '#059669', fontSize: '1.5rem', marginBottom: '1rem' }}>
          📁 File Structure for Nested Routes
        </h2>
        <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
          Our dynamic routing system automatically creates nested routes based on your file structure:
        </p>
        <pre style={{
          background: '#f8fafc',
          padding: '1rem',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: '#334155',
          overflow: 'auto',
          border: '1px solid #e2e8f0',
        }}>
{`src/pages/
├── HomePage.tsx           // Parent layout (/home)
└── home/
    ├── NestedRoutesGuidePage.tsx  // Child route (/home/nestedroutesguide)
    └── APIDataExamplePage.tsx     // Child route (/home/apidataexample)`}
        </pre>
      </div>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #d1fae5',
      }}>
        <h2 style={{ color: '#059669', fontSize: '1.5rem', marginBottom: '1rem' }}>
          ⚙️ How It Works
        </h2>
        <ol style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Dynamic Route Discovery:</strong> The <code>pageRouteGenerator.ts</code> utility scans the <code>pages/</code> directory
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Path Generation:</strong> File names are converted to lowercase URLs (e.g., <code>APIDataExamplePage.tsx</code> → <code>/home/apidataexample</code>)
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Parent Layout:</strong> <code>HomePage.tsx</code> serves as the layout with navigation and <code>&lt;Outlet /&gt;</code>
          </li>
          <li>
            <strong>Child Rendering:</strong> Child components render inside the <code>&lt;Outlet /&gt;</code> based on the URL
          </li>
        </ol>
      </div>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #d1fae5',
      }}>
        <h2 style={{ color: '#059669', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🚀 Creating a New Nested Route
        </h2>
        <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
          Follow these steps to add a new nested route:
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#059669', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Step 1: Create the Component File
          </h3>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
            Create a new file in <code>src/pages/home/</code>:
          </p>
          <pre style={{
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#334155',
            border: '1px solid #e2e8f0',
          }}>
{`// src/pages/home/MyNewFeaturePage.tsx
function MyNewFeaturePage() {
  return (
    <div>
      <h1>My New Feature</h1>
      <p>This is a new nested route!</p>
    </div>
  );
}

export default MyNewFeaturePage;`}
          </pre>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#059669', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Step 2: Add Navigation Link
          </h3>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
            Add a navigation link in <code>HomePage.tsx</code>:
          </p>
          <pre style={{
            background: '#f8fafc',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#334155',
            border: '1px solid #e2e8f0',
          }}>
{`<NavLink
  to="/home/mynewfeature"
  style={({ isActive }) => ({
    // ...styling
  })}
>
  My New Feature
</NavLink>`}
          </pre>
        </div>

        <div>
          <h3 style={{ color: '#059669', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            Step 3: That's It! 🎉
          </h3>
          <p style={{ color: '#4b5563' }}>
            The dynamic routing system will automatically:
          </p>
          <ul style={{ color: '#4b5563', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Discover your new component</li>
            <li>Create the route <code>/home/mynewfeature</code></li>
            <li>Make it accessible through navigation</li>
          </ul>
        </div>
      </div>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #d1fae5',
      }}>
        <h2 style={{ color: '#059669', fontSize: '1.5rem', marginBottom: '1rem' }}>
          💡 Key Benefits
        </h2>
        <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Zero Configuration:</strong> No need to manually define routes
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Consistent Layout:</strong> All nested routes share the same navigation and styling
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Automatic URL Generation:</strong> File names become URL paths automatically
          </li>
          <li>
            <strong>Scalable:</strong> Easy to add new features without touching routing configuration
          </li>
        </ul>
      </div>

      <div style={{
        padding: '1rem',
        background: '#059669',
        borderRadius: '6px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>
          <strong>Current Route:</strong> <code style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '3px' }}>
            /home/nestedroutesguide
          </code>
        </p>
      </div>
    </div>
  );
}

export default NestedRoutesGuidePage;