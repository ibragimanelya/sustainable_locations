import { loginRequest, logoutRequest } from "./UserAPI";

//Log in as admin with "admin123" and "password"

export let user = null;
export let token = "";

export const loggedIn = () => user !== null;

export async function login(username: string, password: string) {
    try {
        console.log(`Tried to log in with username "${username}" and password "${password}".`)
        const res = await loginRequest(username, password); 
        //console.log("Login Result: " + JSON.stringify(res))
        //console.log("Login Result User: " + JSON.stringify(res.user))
        //console.log("Login Result Token: " + res.token)
        user = res.user;
        token = res.token;
        console.log(`Login as ${user.username} successfull`);
        return res; 
    } catch (e) {
        console.error("Login failed: ", e);
        throw e; 
    }
}

export async function logout() {

    try {
        const res = await logoutRequest(token);
        console.log("Logout successfull");
        user = null;
        token = "";
        
    } catch (e) {
        console.error("Logout failed: ", e);
        user = null;
        token = "";
        throw e;
    }
    //nicht success -> trotzdem auf null setzen ???
}