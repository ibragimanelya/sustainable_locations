import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchLocation, updateLocation } from "../domain/API";
import { Location } from "../domain/Location";

const UpdateLocationDetailScreen = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Partial<Location>>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchLocation(parseInt(locationId!))
      .then((res) => setLocation(res))
      .catch((e) => setError(e.message));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const preparedLocation = {
        ...location,
        longitude: parseFloat(location.longitude as any),
        latitude: parseFloat(location.latitude as any),
        zip: parseInt(location.zip as any),
      };
      await updateLocation(parseInt(locationId!), preparedLocation);
      navigate(`/locations/${locationId}`);
    } catch (e: any) {
      setError("Update failed: " + e.message);
    }
  };

  return (
    <div className="card m-2 m-md-4">
      <h2>Update Location</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={location.title || ""}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="description"
          value={location.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />
        <input
          type="number"
          step="any"
          name="longitude"
          value={location.longitude?.toString() || ""}
          onChange={handleChange}
          placeholder="Longitude"
          className="form-control mb-2"
        />
        <input
          type="number"
          step="any"
          name="latitude"
          value={location.latitude?.toString() || ""}
          onChange={handleChange}
          placeholder="Latitude"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="category"
          value={location.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="street"
          value={location.street || ""}
          onChange={handleChange}
          placeholder="Street"
          className="form-control mb-2"
        />
        <input
          type="number"
          name="zip"
          value={location.zip?.toString() || ""}
          onChange={handleChange}
          placeholder="ZIP"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="city"
          value={location.city || ""}
          onChange={handleChange}
          placeholder="City"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="country"
          value={location.country || ""}
          onChange={handleChange}
          placeholder="Country"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="danger"
          value={location.danger || ""}
          onChange={handleChange}
          placeholder="Danger Level"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="time_category"
          value={location.time_category || ""}
          onChange={handleChange}
          placeholder="Time Category"
          className="form-control mb-2"
        />
        <button className="btn btn-success me-2" type="submit">
          Save
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate(`/locations/${locationId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateLocationDetailScreen;
