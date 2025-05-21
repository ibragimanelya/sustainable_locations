import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import Footer from "./components/Footer";
import { Location } from "./domain/Location";
import { fetchAllLocations } from "./domain/API"; // API-Funktion importieren
import "./App.css"; // Deine Styles

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await fetchAllLocations();
        setLocations(data);
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
        setError("Fehler beim Laden der Daten vom Server.");
      }
    };

    loadLocations();
  }, []);

  return (
    <div className="bg-info-subtle">
      <Header />
      <main>
        <h2>Gefundene Fahrrad-Incidents</h2>
        {error ? <p>{error}</p> : <LocationList locations={locations} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
