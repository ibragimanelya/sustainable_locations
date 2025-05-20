import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import Footer from "./components/Footer";
import { Location } from "./domain/Location";
import "./App.css"; // Deine Styles

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      // Beispiel: API-Aufruf oder statische Daten
      const data = await fetch("/api/locations");
      const locations = await data.json();
      setLocations(locations);
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <LocationList locations={locations} /> {/* locations hier übergeben */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
