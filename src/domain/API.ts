import { get } from "http";
import { completeLocation, Location } from "./Location";
import { getAuthHeader, token } from "./auth";

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

export async function updateLocation(id: number, updatedData: Partial<Location>): Promise<Location> {
  const res = await fetch(`${BASE_URL}/incident/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Aktualisieren des Incidents");
  }

  return completeLocation(await res.json());
}

export async function createLocation(newLocation: Partial<Location>): Promise<Location> {
  const res = await fetch(`${BASE_URL}/incident`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(newLocation),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Erstellen des Incidents");
  }

  return completeLocation(await res.json());
}

export async function deleteLocation(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/incident/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getAuthHeader(),
    },
  });

  if (!res.ok) throw new Error("Fehler beim Löschen des Incidents");
}
