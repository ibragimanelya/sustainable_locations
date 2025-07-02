import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import AppHeader from "./Header";
import AppFooter from "./Footer";

interface ErrorScreenProp {
    errorHeading?: string,
    errorMessage?: string
}

const ErrorScreen = ({errorHeading = "Error", errorMessage = ""}: ErrorScreenProp) => {
    const error = useRouteError();
    if (errorMessage === "") {
        errorMessage = isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : "An error occured";
    }
    
    const navigate = useNavigate()
    
    return (
        <div>
            <div className="container-md my-5 mx-5 px-5 card">
                <h1 className="m-2 m-md-4">{errorHeading}</h1>
                <div className="m-2 m-md-4 fs-2">
                    <p>We're sorry. Something went wrong:</p>
                    <p className="text-danger">{errorMessage}</p>
                </div>
            </div>
            <div>
                <button className="btn btn-primary col-3 m-2 m-md-5" onClick={() => navigate(-1)}>Return to last page</button>
            </div>
        </div>
            
    );
};

export default ErrorScreen;