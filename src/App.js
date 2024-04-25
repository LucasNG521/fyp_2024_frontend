import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import EditAnimal from './components/EditAnimal';

function App() {
  return (
    <Router>
      <style>{`
      .container {
        display: flex;
      }

      .sidebar {
        width: 250px;
        background-color: #f0f0f0;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      .content {
        flex: 1;
        padding: 20px;
      }

      .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .sidebar li {
        margin-bottom: 10px;
      }

      .sidebar li:last-child {
        margin-top: auto; /* Pushes the logout button to the bottom */
      }

      .logout-button {
        margin-top: auto;
      }
      `}</style>
      <div className="container">
        <div className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/">Settings</Link></li>
          </ul>
          <div className="logout-button">
            <Link to="/">Logout</Link> {/* Logout button */}
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginPage />} exact />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editAnimal/:animalId" element={<EditAnimal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
