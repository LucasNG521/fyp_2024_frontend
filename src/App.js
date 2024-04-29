import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

import Report from './components/Report/Report';
import ReportDetails from './components/Report/ReportDetails';

import Animal from './components/Animal/Animal';
import AddAnimal from './components/Animal/AddAnimal';
import EditAnimal from './components/Animal/EditAnimal';

import Camera from './components/Camera/Camera';
import AddCamera from './components/Camera/AddCamera';
import EditCamera from './components/Camera/EditCamera';

import HLS from './components/HLS/HLS';


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
    <div style={{ height: '100%' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: 'white', padding: '0 20px', height: '5%' }}>
        <h2>Stray Sentinel</h2>
        <div>
          <a href="/login" style={{ color: 'white', marginRight: '10px' }} onClick={() => { Cookies.remove('uid'); window.location.reload(); }}>Logout</a>
        </div>
      </nav>
      <div style={{ display: 'flex', height: '95%' }}>

        <Router>
          <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="container">
            <div className="content">

              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />


                <Route path="/reports" element={<RequireAuth><Report /></RequireAuth>} />
                <Route path="/report/:id" element={<RequireAuth><ReportDetails /></RequireAuth>} />

                <Route path="/animals" element={<RequireAuth><Animal /></RequireAuth>} />
                <Route path="/add-animal" element={<RequireAuth><AddAnimal /></RequireAuth>} />
                <Route path="/editAnimal/:animalId" element={<RequireAuth><EditAnimal /></RequireAuth>} />
                
                <Route path="/cameras" element={<RequireAuth><Camera /></RequireAuth>} />
                <Route path="/add-camera/" element={<RequireAuth><AddCamera /></RequireAuth>} />
                <Route path="/edit-camera/:cameraId" element={<RequireAuth><EditCamera /></RequireAuth>} />
                
                <Route path="/HLS" element={<RequireAuth><HLS /></RequireAuth>} />

              </Routes>

            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
