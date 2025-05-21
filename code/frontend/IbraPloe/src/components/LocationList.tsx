import React from "react";
import { Location } from "../domain/Location";
import Counter from "./Counter";

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <div className="d-flex flex-column align-items-center px-3">
      <h2>Locations</h2>
      <ul>
        {locations.map((location) => (
          <li className="list-unstyled" key={location.incident_id}>
            <div className="card m-2 m-md-4">
              <div className="row">
                <div className="col-7">
                  <h3>{location.title}</h3>
                  <p className="text-start">{'Description: ' + (location.description.length < 1 ? '-' : location.description)}</p>
                  <p className="text-start">{'Street: ' + location.street}</p>
                  <p className="text-start">{'Zip & City: ' + (location.zip + ' ' + location.city)}</p>
                  <p className="text-start">{'Category: ' + location.category}</p>
                  <p className="text-start">{'Image: ' + (location.images[0] == null ? '-' : location.images[0].image)}</p>
                  <p className="text-start">{'Image count: ' + location.images.length}</p>
                </div>

                <div className="col-4">
                  <img
                    src= 'src\assets\Bike_default.PNG'
                    className="img-thumbnail w-50"
                    alt={location.title}
                  />
                </div>
                <div className="col-1">
                  <Counter/>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
