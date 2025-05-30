import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>Home</NavLink>
        <NavLink to="/admin" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>Admin</NavLink>
      </nav>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
