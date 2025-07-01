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
            <div className="container-md my-5 mx-5 px-5">
                <h1 className="display-3">{errorHeading}</h1>
                <div className="my-3 text-danger display-6">{errorMessage}</div>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Return to last page</button>
            </div>
    );
};

export default ErrorScreen;