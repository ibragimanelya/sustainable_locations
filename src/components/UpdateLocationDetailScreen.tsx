import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchLocation, updateLocation } from "../domain/API";
import { Location } from "../domain/Location";

const UpdateLocationDetailScreen = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Partial<Location>>({});
  const [error, setError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLocation(parseInt(locationId!))
      .then((res) => setLocation(res))
      .catch((e) => setError(e.message));
  }, [locationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const preparedLocation: Partial<Location> = {
        title: location.title,
        description: location.description,
        latitude: parseFloat(location.latitude as any),
        longitude: parseFloat(location.longitude as any),
        category: location.category,
        street: location.street,
        zip: parseInt(location.zip as any),
        city: location.city,
        country: location.country,
        danger: location.danger,
        time_category: location.time_category,
      };

      await updateLocation(
        parseInt(locationId!),
        preparedLocation,
        imageFile ?? undefined
      );

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
        {[
          "title",
          "description",
          "longitude",
          "latitude",
          "category",
          "street",
          "zip",
          "city",
          "country",
          "danger",
          "time_category",
        ].map((field) => (
          <input
            key={field}
            type={field === "zip" ? "number" : "text"}
            name={field}
            value={(location as any)[field] || ""}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="form-control mb-2"
          />
        ))}

        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">
            Upload new image (optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>

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
