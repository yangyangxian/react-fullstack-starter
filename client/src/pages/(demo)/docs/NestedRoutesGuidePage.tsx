function NestedRoutesGuidePage() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-left max-w-[888px] mx-auto my-8">
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
├── HomePage.tsx           // Public landing page (/)
├── DocsPage.tsx          // Parent layout (/docs)
└── docs/
    ├── NestedRoutesGuidePage.tsx  // Child route (/docs/nestedroutesguide)
    └── APIDataExamplePage.tsx     // Child route (/docs/apidataexample)`}
        </pre>
      </div>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          🏗️ Application Structure
        </h2>
        <p className="text-gray-600 mb-4">
          This fullstack application has a clean separation between public and documentation areas:
        </p>
        <ul className="text-gray-600 pl-6 list-disc">
          <li className="mb-2">
            <strong>Public Landing (/):</strong> Welcome page with project overview and documentation link
          </li>
          <li className="mb-2">
            <strong>Authentication (/login, /signup):</strong> User authentication pages
          </li>
          <li className="mb-2">
            <strong>Documentation (/docs):</strong> Protected area with development guides and API examples
          </li>
          <li>
            <strong>Nested Routes (/docs/*):</strong> Individual documentation pages and examples
          </li>
        </ul>
      </div>

      <div className="mb-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
        <h2 className="text-emerald-600 text-2xl mb-4">
          🚀 Creating a New Nested Route
        </h2>

        <div className="mb-6">
          <h3 className="text-emerald-600 text-xl mb-2">
            Step 1: Create the Parent and Child Component Files
          </h3>
          <p className="text-gray-600 mb-4">
            Create a parent page and child page in the following structure:
          </p>
          <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 border border-slate-200 mb-4">
{`src/pages/
├── ParentPage.tsx           // Parent route (/parent)
└── parent/
    └── ChildPage.tsx        // Child route (/parent/child)`}
          </pre>
          <div className="mb-4">
            <h4 className="text-emerald-700 text-lg mb-1">src/pages/ParentPage.tsx</h4>
            <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 border border-slate-200">
{`import { Outlet } from "react-router-dom";

function ParentPage() {
  return (
    <div>
      <h1>Parent Page</h1>
      <Outlet />
    </div>
  );
}

export default ParentPage;`}
            </pre>
          </div>
          <div>
            <h4 className="text-emerald-700 text-lg mb-1">src/pages/parent/ChildPage.tsx</h4>
            <pre className="bg-slate-50 p-4 rounded-md text-sm text-slate-700 border border-slate-200">
{`function ChildPage() {
  return (
    <div>
      <h2>Child Page</h2>
      <p>This is a nested route under /parent/child</p>
    </div>
  );
}

export default ChildPage;`}
            </pre>
          </div>
        </div>
        <div>
          <h3 className="text-emerald-600 text-xl mb-2">
            Step 2: That's It! 🎉
          </h3>
          <p className="text-gray-600">
            The dynamic routing system will automatically:
          </p>
          <ul className="text-gray-600 pl-6 mt-2 list-disc">
            <li>Discover your new parent and child components</li>
            <li>Create the routes <code>/parent</code> and <code>/parent/child</code></li>
            <li>Render <code>ChildPage</code> inside <code>ParentPage</code> via <code>&lt;Outlet /&gt;</code></li>
          </ul>
        </div>
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
            <strong>Path Generation:</strong> File names are converted to lowercase URLs (e.g., <code>APIDataExamplePage.tsx</code> → <code>/docs/apidataexample</code>)
          </li>
          <li className="mb-2">
            <strong>Parent Layout:</strong> <code>DocsPage.tsx</code> serves as the layout with navigation and <code>&lt;Outlet /&gt;</code>
          </li>
          <li>
            <strong>Child Rendering:</strong> Child components render inside the <code>&lt;Outlet /&gt;</code> based on the URL
          </li>
        </ol>
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