import { useState } from "react";
import { useNavigate } from "react-router";
import { createLocation } from "../domain/API";
import { defaultLocation, Location } from "../domain/Location";

const CreateNewLocationScreen = () => {
  const [newLocation, setNewLocation] =
    useState<Partial<Location>>(defaultLocation);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLocation(newLocation)
      .then((created) => {
        navigate(`/locations/${created.incident_id}`);
      })
      .catch((e) => {
        setError("Create failed: " + e.message);
      });
  };

  return (
    <div className="card m-2 m-md-4">
      <h2>Create New Location</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newLocation.title || ""}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="description"
          value={newLocation.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />
        <button className="btn btn-success me-2" type="submit">
          Save
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate("/locations")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateNewLocationScreen;
