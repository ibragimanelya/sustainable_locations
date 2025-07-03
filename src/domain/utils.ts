import { user, loggedIn } from "./auth";
import { Location } from "./Location";

/**
 * Gibt true zurück, wenn der aktuelle User eingeloggt ist und 'admina' heißt.
 * Entspricht der Option 1-Rollenlogik.
 */
export function isAdmin(): boolean {
  return loggedIn() && user?.username === "admina";
}

/**
 * Gibt true zurück, wenn der eingeloggte User dieses Incident bearbeiten darf.
 * Für Option 1 ist das nur 'admina'.
 */
export function canEdit(location: Location): boolean {
  return isAdmin();
}

/**
 * Gibt true zurück, wenn der eingeloggte User dieses Incident löschen darf.
 */
export function canDelete(location: Location): boolean {
  return isAdmin();
}
