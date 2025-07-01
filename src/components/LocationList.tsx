import React, { useEffect, useState } from "react";
import { Location } from "../domain/Location";
import ListItem from "./ListItem";
import { useLocations } from "../domain/hooks";


const LocationList = () => {

  const {locations, state, error, refresh} = useLocations();
  
    const [lastRefresh, setLastRefresh] = useState(Date.now());
  
    useEffect(refresh, [lastRefresh]);  
  
    useEffect(() => {
      const intervallId = setInterval(setLastRefresh, 10000, Date.now()); 
      return () => clearInterval(intervallId);
    })
  
    //todo add button einfügen navigate("/locations/add")
  return (
    <div className="d-flex flex-column align-items-center px-3">
      <h2>Gefundene Fahrrad-Incidents</h2>
      <ul>
        {state === "success" ? locations.length > 0 ? locations.map((location) => <ListItem location={location}/>) : "No Locations" : `error: ${error}`}
      </ul>
    </div>
  );
};

export default LocationList;
