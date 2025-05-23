// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {

  return (
    <footer className="bg-info text-white text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
            <div className="d-flex flex-column align-items-center px-3">
              <ul className="list-unstyled mb-0">
                <li><a href="#about" className="text-white">About us</a></li>
                <li><a href="#legal" className="text-white">Legal Notice</a></li>
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
