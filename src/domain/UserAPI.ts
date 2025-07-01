import { UserResponse } from "./UserResponse";


const BASE_URL = "http://141.45.191.149:7777/bikelin/api";

export async function loginRequest(username: string, password: string): Promise<UserResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserCreds: { username, password } }),
    });

    if (!res.ok) throw new Error("Login fehlgeschlagen");

    let resObject = await res.json();
    return resObject.UserResponse;
};


export async function logoutRequest(token: string){
    
  const res = await fetch(`${BASE_URL}/users/logout`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) throw new Error("Logout fehlgeschlagen");

}