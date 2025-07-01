import { UserResponse } from "./UserResponse";


const BASE_URL = "http://141.45.191.149:7777/bikelin/api";

export async function loginRequest(username: string, password: string): Promise<UserResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserCreds: { username, password } }),
    });

    if (!res.ok) throw new Error("Login fehlgeschlagen");

    return await res.json();
};


export async function logoutRequest(user: UserResponse){
    
  const res = await fetch(`${BASE_URL}/users/logout`); //todo Token hinzufügen

  if (!res.ok) throw new Error("Logout fehlgeschlagen");

}