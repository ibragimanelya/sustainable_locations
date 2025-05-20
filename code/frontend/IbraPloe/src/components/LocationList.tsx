import React from "react";
import { Location } from "../domain/Location";
import Counter from "./Counter";

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.incident_id}>
            <h3>{location.title}</h3>
            <p>{location.description}</p>
            <Counter/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
