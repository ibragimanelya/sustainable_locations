import { loggedIn, logout } from "../domain/auth";
import React from "react";
import { useNavigate } from "react-router";

const Header: React.FC = () => {

  const navigate = useNavigate();

  const onLogout = () => { 
    logout().then(() => {
      console.log("Successfully logged out");
    }).catch(e => console.log("Logout failed: " + e.message));
    navigate("/login");
  }

  //todo LoggedIn überarbeiten und logout-Button nur anzeigen wenn angemeldet
  //todo logo anklicken -> zu menü geleitet

  return (
    <header>
      <nav className="navbar bg-info px-3 mb-4">
        <div className="d-flex align-items-center col-11">
          <img
            src="/logo.png" 
            alt="App Logo"
            height="40"
            className="me-2"
          />
          <span className="navbar-brand mb-0 h1 text-white" style={{ fontSize: '1.75rem'}}>IbraPloe Incidents</span>
        </div>
        <div className="col-1">
          {loggedIn && (<button className="btn btn-primary" onClick={onLogout}>Logout</button>)}
        </div>
      </nav>
    </header>
  );
};

export default Header;
