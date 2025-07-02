import { useNavigate } from "react-router";
import { login, user } from "../domain/auth";
import React, { FormEvent, useEffect, useState } from "react";
import { validatePassword, validateUsername } from "../domain/validators";

const LoginScreen = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const onsubmit = (e: FormEvent) => {
        e.preventDefault();
        let v = validateUsername(username);
        if (v) {
            setError(v);
            return;
        }
        v = validatePassword(password);
        if (v) {
            setError(v);
            return;
        }
        login(username, password).then(() => {
            console.log("Login success: " + user);
            setError("");
            navigate("/locations");
        }).catch(e => {
            setError("Wrong username or password");
            console.log("Login failed: " + e.message); 
        });
    };

    return (
        <div className="card m-2 m-md-4 d-flex flex-column align-items-center px-3">
            <img
            src="/logo.png" 
            alt="App Logo"
            height="40"
            className="me-2"
            />
            <h1 className="m-2 m-md-4">Welcome to IbraPloe Incidents!</h1>
            <form onSubmit={onsubmit}>
                <div className="row m-2 m-md-4">
                    <div className="col-6">
                        <label htmlFor="username" className="form-label m-1">Username</label>
                        <input type="text" id="username" name="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    
                    
                </div>
                <div className="row m-2 m-md-4">
                    <div className="col-6">
                        <label htmlFor="password" className="form-label m-1">Password</label>
                        <input type="password" id="password" name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                {error !== "" && (<div className="row m-2 m-md-4">
                    <p className="text-danger">
                        {error}
                    </p>
                </div>)}
                <div className="row m-2 m-md-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
        
    )
}

export default LoginScreen;