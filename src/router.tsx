import App from "./App";
import { createBrowserRouter, redirect } from "react-router";
import Header from "./components/Header";
import ErrorScreen from "./components/ErrorScreen";
import Footer from "./components/Footer";
import LoginScreen from "./components/LoginScreen";
import LocationList from "./components/LocationList";
import LocationDetailScreen from "./components/LocationDetailScreen";
import UpdateLocationDetailScreen from "./components/UpdateLocationDetailScreen";
import CreateNewLocationScreen from "./components/CreateNewLocationScreen";
import AboutScreen from "./components/AboutScreen";
import { loggedIn } from "./domain/auth";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <App/>,
        errorElement: <>
            <Header/>
            <ErrorScreen/>
            <Footer/>
        </>,
        children: [
            {
                path: "/",
                loader: () => redirect("/login")
            },
            {
                path: "/login",
                element: <LoginScreen/>
            }, 
            {
                path: "/locations",
                element: <LocationList/>
            },
            {
                path: "/locations/:locationId",
                element: <LocationDetailScreen/>
            },
            {
                path: "/locations/edit/:locationId",
                element: <UpdateLocationDetailScreen/>
            }, 
            {
                path: "/locations/add",
                element: <CreateNewLocationScreen/>
            },
            {
                path: "/error",
                element: <ErrorScreen/>
            },
            {
                path: "/about",
                element: <AboutScreen/>
            },
        ]
    }
])