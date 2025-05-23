import React from "react";
import { Location } from "../domain/Location";
import ListItem from "./ListItem";

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <div className="d-flex flex-column align-items-center px-3">
      <h2>Gefundene Fahrrad-Incidents</h2>
      <ul>
        {locations.map((location) => <ListItem location={location}/>)}
      </ul>
    </div>
  );
};

export default LocationList;
