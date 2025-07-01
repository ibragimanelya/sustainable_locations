import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; // Deine Styles
import { Outlet } from "react-router";

const App: React.FC = () => {

  return (
    <div className="bg-info-subtle">
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default App;
