// src/components/Footer.tsx
import React from "react";
import { useNavigate } from "react-router";

const Footer: React.FC = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-info text-white text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
            <div className="d-flex flex-column align-items-center px-3">
              <ul className="list-unstyled mb-0">
                <li><a className="text-white" onClick={() => navigate("/about")}>About us</a></li>
                <li><a className="text-white" onClick={() => navigate("/about")}>Legal Notice</a></li>
              </ul>
            </div>
          </div>
        </div>
      <div className="text-center p-3">
      © 2025 IbraPloe
    </div>
  </footer>
  );
};

export default Footer;
