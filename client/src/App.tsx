import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { NavLink, Navigation } from 'react-router-dom';

function App() {
  return (
    <div>
      <div style={{marginBottom: '80px'}}>
        <NavLink to="/" style={{ marginRight: '20px', fontSize: '50px' }}>Home</NavLink>
        <NavLink to="/admin" style={{ fontSize: '50px' }}>Admin</NavLink>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
