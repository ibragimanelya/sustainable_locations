import { get } from "http";
import { completeLocation, Location } from "./Location";
import { getAuthHeader, token } from "./auth";
import { parse } from "path";
import { user } from "./auth";

const BASE_URL = "http://141.45.191.149:7777/bikelin/api";

export async function fetchAllLocations(): Promise<Location[]> {
  const res = await fetch(`${BASE_URL}/incidents`);
  if (!res.ok) {
    throw new Error("Fehler beim Abrufen der Incidents");
  }
  return (await res.json()).map(completeLocation);
}

export async function fetchLocation(id: number): Promise<Location> {
  const res = await fetch(`${BASE_URL}/incident/${id}`);
  if (!res.ok) {
    throw new Error("Fehler beim Abrufen eines Incidents");
  }
  return completeLocation(await res.json());
}

export async function updateLocation(id: number, updatedData: Partial<Location>, file?: File): Promise<void> {

  const formData = new FormData();
  const userFromStorage = JSON.parse(localStorage.getItem("user") ?? "{}");

  const incidentObject = {
    ...updatedData,
    incident_id: id,
    user: userFromStorage?.username ?? "admina",
  };

  formData.append("incident", JSON.stringify(incidentObject));
  if (file) formData.append("file", file);

  const res = await fetch(`${BASE_URL}/incident/update`, {
    method: "PUT",
    headers: {
      Authorization: getAuthHeader(),
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Fehler beim Aktualisieren des Incidents");
}

export async function createLocation(
  newLocation: Partial<Location>,
  file?: File
): Promise<number> {
  const formData = new FormData();

  // 1. JSON-Daten als STRING im Feld "incident" (nicht "incident")
  formData.append(
    "incident", // Feldname muss exakt mit Server-Erwartung übereinstimmen
    JSON.stringify({
      ...newLocation,
      longitude: Number(newLocation.longitude),
      latitude: Number(newLocation.latitude),
    })
  );

  // 2. Bild nur anhängen, wenn vorhanden (Feldname "file")
  if (file) {
    formData.append("file", file); // Feldname muss "file" sein
  }

  const response = await fetch(`${BASE_URL}/incident/upload`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(), // JWT-Token
      // KEIN 'Content-Type'-Header! Browser setzt automatisch korrekten multipart/formdata-Header
    },
    body: formData,
  });

  if (!response.ok) throw new Error(await response.text());
  return (await response.json()).id;
}

export async function deleteLocation(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/incident/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  });

  if (res.status === 403)
    throw new Error("You don't have permission to delete this incident");

  if (!res.ok) {
    const msg = await res.text();
    console.error("Delete failed:", msg);
    throw new Error("Fehler beim Löschen des Incidents");
  }
}
