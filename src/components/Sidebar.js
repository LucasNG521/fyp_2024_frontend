import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/login";

  if (!showSidebar) return null;

  return (
    <div className={`sidebar ${isOpen ? '' : 'sidebar-closed'}`}>
      <div className="sidebar-content">
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/animals" className={location.pathname === '/animals' ? 'active' : ''}>
              Animals
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout-button">
        <Link to="/login" onClick={() => { Cookies.remove('uid'); window.location.reload(); }}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;