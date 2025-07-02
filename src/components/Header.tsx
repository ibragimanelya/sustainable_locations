import { loggedIn, logout, user } from "../domain/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Header: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());

  useEffect(() => {
    setIsLoggedIn(loggedIn());
  })

  const navigate = useNavigate();

  const onLogout = () => { 
    logout().then(() => {
      console.log("Successfully logged out");
      setIsLoggedIn(loggedIn());
    }).catch(e => console.log("Logout failed: " + e.message));
    navigate("/login");
  }

  return (
    <header>
      <nav className="navbar bg-info px-3 mb-4">
        <div className="d-flex align-items-center col-11" onClick={() => navigate(isLoggedIn ? "/locations" : "/login")}>
          <img
            src="/logo.png" 
            alt="App Logo"
            height="40"
            className="me-2"
          />
          <span className="navbar-brand mb-0 h1 text-white" style={{ fontSize: '1.75rem'}}>IbraPloe Incidents</span>
        </div>
        <div className="col-1">
          {isLoggedIn && (<button className="btn btn-primary" onClick={onLogout}>Logout</button>)}
        </div>
      </nav>
    </header>
  );
};

export default Header;
