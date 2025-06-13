function NestedRoutesGuidePage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-left max-w-3xl mx-auto my-8">
      <h1 className="text-emerald-600 mb-6 text-3xl font-bold text-center">
        Nested Routes Developer Guide
      </h1>
      
      <p className="text-gray-600 mb-8 text-lg text-center">
        Learn how to implement nested routes in this React fullstack application using our dynamic routing system.
      </p>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          📁 File Structure for Nested Routes
        </h2>
        <p className="text-gray-600 mb-4">
          Our dynamic routing system automatically creates nested routes based on your file structure:
        </p>
        <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 overflow-auto border border-slate-200">
{`src/pages/
├── HomePage.tsx           // Parent layout (/home)
└── home/
    ├── NestedRoutesGuidePage.tsx  // Child route (/home/nestedroutesguide)
    └── APIDataExamplePage.tsx     // Child route (/home/apidataexample)`}
        </pre>
      </div>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          ⚙️ How It Works
        </h2>
        <ol className="text-gray-600 pl-6 list-decimal">
          <li className="mb-2">
            <strong>Dynamic Route Discovery:</strong> The <code>pageRouteGenerator.ts</code> utility scans the <code>pages/</code> directory
          </li>
          <li className="mb-2">
            <strong>Path Generation:</strong> File names are converted to lowercase URLs (e.g., <code>APIDataExamplePage.tsx</code> → <code>/home/apidataexample</code>)
          </li>
          <li className="mb-2">
            <strong>Parent Layout:</strong> <code>HomePage.tsx</code> serves as the layout with navigation and <code>&lt;Outlet /&gt;</code>
          </li>
          <li>
            <strong>Child Rendering:</strong> Child components render inside the <code>&lt;Outlet /&gt;</code> based on the URL
          </li>
        </ol>
      </div>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          🚀 Creating a New Nested Route
        </h2>
        <p className="text-gray-600 mb-4">
          Follow these steps to add a new nested route:
        </p>
        
        <div className="mb-6">
          <h3 className="text-emerald-600 text-xl mb-2">
            Step 1: Create the Component File
          </h3>
          <p className="text-gray-600 mb-2">
            Create a new file in <code>src/pages/home/</code>:
          </p>
          <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 border border-slate-200">
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

        <div className="mb-6">
          <h3 className="text-emerald-600 text-xl mb-2">
            Step 2: Add Navigation Link
          </h3>
          <p className="text-gray-600 mb-2">
            Add a navigation link in <code>HomePage.tsx</code>:
          </p>
          <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 border border-slate-200">
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
          <h3 className="text-emerald-600 text-xl mb-2">
            Step 3: That's It! 🎉
          </h3>
          <p className="text-gray-600">
            The dynamic routing system will automatically:
          </p>
          <ul className="text-gray-600 pl-6 mt-2 list-disc">
            <li>Discover your new component</li>
            <li>Create the route <code>/home/mynewfeature</code></li>
            <li>Make it accessible through navigation</li>
          </ul>
        </div>
      </div>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          💡 Key Benefits
        </h2>
        <ul className="text-gray-600 pl-6 list-disc">
          <li className="mb-2">
            <strong>Zero Configuration:</strong> No need to manually define routes
          </li>
          <li className="mb-2">
            <strong>Consistent Layout:</strong> All nested routes share the same navigation and styling
          </li>
          <li className="mb-2">
            <strong>Automatic URL Generation:</strong> File names become URL paths automatically
          </li>
          <li>
            <strong>Scalable:</strong> Easy to add new features without touching routing configuration
          </li>
        </ul>
      </div>

      <div className="p-4 bg-emerald-600 rounded-md text-center">
        <p className="text-white text-lg font-semibold">
          Happy Coding!
        </p>
      </div>
    </div>
  );
}

export default NestedRoutesGuidePage;