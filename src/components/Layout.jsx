import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faTasks,
  faPlus,
  faBars,
  faTimes,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Layout.css";

function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: faChartPie },
    { path: "/tasks", label: "Daftar Tugas", icon: faTasks },
    { path: "/task-form", label: "Tambah Tugas", icon: faPlus }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Mobile Top Navbar */}
      <header className="mobile-header d-lg-none d-flex align-items-center justify-content-between px-3 py-2 bg-white border-bottom">
        <div className="d-flex align-items-center gap-2">
          <div className="app-logo-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <span className="app-logo-text">CollabTask</span>
        </div>
        <button className="btn-toggle-sidebar btn btn-outline-secondary btn-sm" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`sidebar bg-dark text-white ${sidebarOpen ? "show" : ""}`}>
        <div className="sidebar-header d-flex align-items-center gap-2 px-4 py-4 border-bottom border-secondary">
          <div className="app-logo-icon bg-primary text-white d-flex align-items-center justify-content-center rounded">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <span className="app-logo-text h5 mb-0 fw-bold">CollabTask</span>
        </div>

        <nav className="sidebar-nav py-3 px-2 flex-grow-1">
          <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link-custom d-flex align-items-center gap-3 px-3 py-2 rounded transition ${
                      isActive ? "active text-white bg-primary" : "text-light-muted"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="icon-wrapper">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <span className="link-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer p-3 border-top border-secondary bg-dark-darker text-center small text-secondary">
          <span>v1.0.0 &bull; UJIKOM Ira Revalia</span>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay d-lg-none" onClick={toggleSidebar}></div>
      )}

      {/* Main Content Area */}
      <main className="main-content flex-grow-1 bg-light">
        <div className="content-container p-4 max-width-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
