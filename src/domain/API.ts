import { Location } from "./Location";
import { token } from "./auth";

const BASE_URL = "http://141.45.191.149:7777/bikelin/api";

export async function fetchAllLocations(): Promise<Location[]> {
  const res = await fetch(`${BASE_URL}/incidents`);
  if (!res.ok) {
    throw new Error("Fehler beim Abrufen der Incidents");
  }
  return await res.json();
}

export async function fetchLocation(id: number): Promise<Location> {
  const res = await fetch(`${BASE_URL}/incident/${id}`);
  if (!res.ok) {
    throw new Error("Fehler beim Abrufen eines Incidents");
  }
  return await res.json();
}

//todo add update and create Location methods
//use user token from auth