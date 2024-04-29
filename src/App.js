import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ReportDetails from './components/ReportDetails';
import Animal from './components/Animal';
import AddAnimal from './components/AddAnimal';
import EditAnimal from './components/EditAnimal';
import Sidebar from './components/Sidebar';
import Cookies from 'js-cookie';
import './App.css';

const RequireAuth = ({ children }) => {
  const uid = Cookies.get('uid');
  if (!uid) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height:'100%' }}>
      <Router>
        <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="container">
          <div className="content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/report/:id" element={<RequireAuth><ReportDetails /></RequireAuth>} />
              <Route path="/animals" element={<RequireAuth><Animal /></RequireAuth>} />
              <Route path="/add-animal" element={<RequireAuth><AddAnimal /></RequireAuth>} />
              <Route path="/editAnimal/:animalId" element={<RequireAuth><EditAnimal /></RequireAuth>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
