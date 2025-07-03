import { get } from "http";
import { loginRequest, logoutRequest } from "./UserAPI";

//Log in as admin with "admin123" and "password"

export let user = JSON.parse(localStorage.getItem("user") ?? "null");
export let token = localStorage.getItem("token") ?? "";

export const loggedIn = () => user !== null;

export const getAuthHeader = (): string => {
  return token ? `Bearer ${token}` : "";
};

export async function login(username: string, password: string) {
  try {
    const res = await loginRequest(username, password);
    //console.log("Login Result: " + JSON.stringify(res))
    //console.log("Login Result User: " + JSON.stringify(res.user))
    //console.log("Login Result Token: " + res.token)
    user = res.user;
    token = res.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    console.log(`Login as ${user.username} successfull`);
    return res;
  } catch (e) {
    console.error("Login failed: ", e);
    throw e;
  }
}

export async function logout() {
  try {
    const res = await logoutRequest(getAuthHeader());
    console.log("Logout successfull");
    user = null;
    token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } catch (e) {
    console.error("Logout failed: ", e);
    user = null;
    token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    throw e;
  }
  //nicht success -> trotzdem auf null setzen ???
}
