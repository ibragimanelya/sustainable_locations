import { useNavigate } from "react-router";
import { login, user } from "../domain/auth";
import React, { FormEvent, useEffect } from "react";

const LoginScreen = () => {

    const navigate = useNavigate();

    const onsubmit = (e: FormEvent) => { //todo Testen wenn die Datenbank wieder funktioniert
        e.preventDefault();
        login("testy", "testy123").then(() => {
            console.log("Login success: " + user);
            navigate("/locations");
        }).catch(e => {
            console.log("Login failed: " + e.message); 
            //todo visual feedback 
        });
    };

    return <form>
        <button type="submit" className="btn btn-success" onClick={onsubmit}>Login</button>
    </form>
}

export default LoginScreen;