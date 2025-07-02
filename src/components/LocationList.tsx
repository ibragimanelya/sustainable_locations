import React, { useEffect, useState } from "react";
import { Location } from "../domain/Location";
import ListItem from "./ListItem";
import { useLocations } from "../domain/hooks";
import { useNavigate } from "react-router";
import { loggedIn, logout, user } from "../domain/auth";

//todo welcome message personalisiert

const LocationList = () => {

  const {locations, state, error, refresh} = useLocations();
  
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(refresh, [lastRefresh]);  

  useEffect(() => {
    const intervallId = setInterval(setLastRefresh, 1200000, Date.now()); 
    return () => clearInterval(intervallId);
  })

  const navigate = useNavigate();
  
  return (
    <div className="d-flex flex-column align-items-center px-3">
      {loggedIn() && (<div className="card m-2 m-md-4">
        <p className="text-white">Welcome, {user.username}! This page highlights various bike incident locations, both good and bad.</p>
        <p className="text-white">Stay informed and help make the city a safer place for cyclists!</p>
      </div>)}
      <h1 className="m-2 m-md-4">Bike Incidents Overview</h1>
      {!loggedIn() && <h3 className="text-danger">You are currently not logged in</h3>}
      {loggedIn() && user.role === "admin" && <button className="btn btn-primary" onClick={() => navigate("/locations/add")}>Add new location</button>}
      <ul>
        {state === "success" ? locations.length > 0 ? locations.map((location) => <ListItem key={location.incident_id} location={location}/>) : "No Locations" : `error: ${error}`}
      </ul>
    </div>
  );
};

export default LocationList;
