import { fetchLocation } from "../domain/API";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteLocation } from "../domain/API";
import { Location } from "../domain/Location";
import { loggedIn, user } from "../domain/auth";
import { useLocations } from "../domain/hooks";

const LocationDetailScreen = () => {
  const { locationId } = useParams<{ locationId: string }>();

  const [location, setLocation] = useState<Location | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLocation(parseInt(locationId))
      .then((res) => {
        setLocation(res);
      })
      .catch((e) => {
        setError(e.message);
        console.log("Loading Location failed");
        throw e;
      });
  }, []);

  if (location == null)
    return (
      <div className="card m-2 m-md-4">
        <h1>No Location</h1>
        <p className="fs-3 text-danger">
          We could not find the location you were looking for.
        </p>
      </div>
    );

  let options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  //todo Tags hinzufügen
  return (
    <div>
      <div className="card m-2 m-md-4">
        <div className="row">
          <h1>{location.title}</h1>
        </div>
        <div className="row">
          <div className="col-7">
            <p className="text-start">{"Latitude: " + location.latitude}</p>
            <p className="text-start">{"Longitude: " + location.longitude}</p>
            <p className="text-start">
              {"Date: " + new Date(location.date).toLocaleDateString("de-DE")}
            </p>
            <p className="text-start">{"Category: " + location.category}</p>
            <p className="text-start">
              {"Description: " +
                (location.description.length < 1 ? "-" : location.description)}
            </p>
            <p className="text-start">{"Street: " + location.street}</p>
            <p className="text-start">
              {"Zip & City: " + (location.zip + " " + location.city)}
            </p>
            <p className="text-start">{"Country: " + location.country}</p>
            <p className="text-start">{"User: " + location.user}</p>
            <p className="text-start">{"Danger: " + location.danger}</p>
            <p className="text-start">
              {"Time category: " + location.time_category}
            </p>
          </div>
          <div className="col-4">
            <img
              src={
                location.images.length != 0
                  ? `http://141.45.191.149:7777/bikelin/api/incident/image/${location.images[0].image}`
                  : "/No_bike_image.PNG"
              }
              className="img-thumbnail w-50"
              alt={location.title}
            />
            <ul>
              {location.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="m-2 m-md-4">
        <button
          className="btn btn-info text-white m-2"
          onClick={() => navigate("/locations")}
        >
          Back to overview
        </button>
        {loggedIn() && user.role === "admin" && (
          <>
            <button
              className="btn btn-primary m-2"
              onClick={() =>
                navigate(`/locations/edit/${location.incident_id}`)
              }
            >
              Edit
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                deleteLocation(location.incident_id)
                  .then(() => {
                    navigate("/locations");
                  })
                  .catch((e) => {
                    console.error("Delete failed:", e.message);
                    navigate("/error");
                  });
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationDetailScreen;
