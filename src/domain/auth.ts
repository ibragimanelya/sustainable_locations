import { loginRequest } from "./UserAPI";

export let user = null;
export let token = "";

export async function login(username: string, password: string) {
    try {
        const res = await loginRequest(username, password); 
        console.log("Login successfull");
        user = res.user;
        token = res.token;
        return res; 
    } catch (e) {
        console.error("Login failed: ", e);
        throw e; 
    }
}

export function logout() {
    //todo logoutRequest aufrufen aus der API 
    //success -> auf null setzen
    //nicht success -> trptzdem auf null setzen ???
}