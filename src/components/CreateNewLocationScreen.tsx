import { useState } from "react";
import { useNavigate } from "react-router";
import { createLocation } from "../domain/API";
import { defaultLocation, Location } from "../domain/Location";
import { user } from "../domain/auth";

const CreateNewLocationScreen = () => {
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    ...defaultLocation,
    user: user?.username || "", // Setze aktuellen Benutzer
    city: "Berlin", // Default-Wert
    country: "Germany", // Default-Wert
    time_category: "permanent", // Default-Wert
    category: "", // Default-Wert
    danger: "" //Default-Wert
  });

  const [hasDanger, setHasDanger] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (name === "dangerCheck") {
        setHasDanger(checked);
    } else {
        setNewLocation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate coordinates
      const lat = Number(newLocation.latitude);
      const lng = Number(newLocation.longitude);

      if (isNaN(lat)) throw new Error("Invalid latitude");
      if (isNaN(lng)) throw new Error("Invalid longitude");

      // Validate required fields
      if (!newLocation.title) throw new Error("Title is required");
      if (!newLocation.category) throw new Error("Category is required");
      if (!newLocation.danger) throw new Error("Danger is required");

      const payload : any = {
        title: newLocation.title,
        description: newLocation.description || "",
        longitude: lng,
        latitude: lat,
        category: newLocation.category,
        danger: newLocation.danger,
        street: newLocation.street || "",
        zip: newLocation.zip ? Number(newLocation.zip) : 0,
        city: newLocation.city || "Berlin",
        country: newLocation.country || "Germany",
        time_category: newLocation.time_category || "permanent",
        user: user?.username || "",
        date: Date.now(),
      };

      //if (hasDanger) payload.danger = "Warning";

      console.log(payload);

      const newId = await createLocation(payload, imageFile);
      navigate(`/locations/${newId}`);
    } catch (error) {
      console.error("Creation error:", error);
      setError(error.message);
    }
  };

  const fields = [
    { name: "title", type: "text", required: true },
    { name: "description", type: "text" },
    { name: "latitude", type: "number", required: true, step: "0.000001" },
    { name: "longitude", type: "number", required: true, step: "0.000001" },
    { name: "street", type: "text" },
    { name: "zip", type: "number" },
    { name: "city", type: "text" },
    { name: "country", type: "text" },
    { name: "time_category", type: "text" }
  ];

  return (
    <div className="d-flex justify-content-center p-3">
      <div className="card p-4 w-100" style={{ maxWidth: "700px" }}>
        <h2>Create New Location</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                {field.required && <span className="text-danger">*</span>}
              </label>
              <input
                type={field.type}
                className="form-control"
                id={field.name}
                name={field.name}
                value={(newLocation as any)[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                step={field.step}
              />
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category <span className="text-danger">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={newLocation.category || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- bitte wählen --
              </option>
              <option value="bikes">Bikes</option>
              <option value="trash">Trash</option>
              <option value="construction">Construction Work</option>
              <option value="road_damage">Road Damage</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Checkbox für Danger */}
          {/*<div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="dangerCheck"
              name="dangerCheck"
              checked={hasDanger}
              onChange={handleChange}
            />
            <label htmlFor="dangerCheck" className="form-check-label">
              Als „Warning“ markieren
            </label>
          </div>*/}

          <div className="mb-3">
            <label htmlFor="danger" className="form-label">
              Danger <span className="text-danger">*</span>
            </label>
            <select
              id="danger"
              name="danger"
              className="form-select"
              value={newLocation.danger || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- bitte wählen --
              </option>
              <option value="All good!">All good!</option>
              <option value="High">High</option>
              <option value="Warning">Warning</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image (optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/locations")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewLocationScreen;
