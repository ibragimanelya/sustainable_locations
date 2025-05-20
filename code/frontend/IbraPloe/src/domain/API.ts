import { Location } from "./Location";

const BASE_URL = "http://141.45.191.149:7777/bikelin/api";

export async function fetchAllLocations(): Promise<Location[]> {
  const res = await fetch(`${BASE_URL}/incidents`);
  return await res.json();
}

export async function fetchLocation(locationId: number): Promise<Location> {
  const res = await fetch(`${BASE_URL}/incident/${locationId}`);
  return await res.json();
}