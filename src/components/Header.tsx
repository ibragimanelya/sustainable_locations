import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar bg-info px-3 mb-4">
        <div className="d-flex align-items-center">
          <img
            src="/logo.png" 
            alt="App Logo"
            height="40"
            className="me-2"
          />
          <span className="navbar-brand mb-0 h1 text-white" style={{ fontSize: '1.75rem'}}>IbraPloe Incidents</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
