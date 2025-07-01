import { useState } from "react";
import { fetchAllLocations } from "./API";
import { Location } from "./Location";

export type HookState = "error" | "success"

export function useLocations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [state, setState] = useState<HookState>("success");
    const [error, setError] = useState<string>();

    const refresh = () => {
        fetchAllLocations().then(res => {
            setLocations(res);
            setState("success");
        }).catch(e => {
            setError(e.message);
            setState("error");
            console.log("Refresh failed");
        })
    }
    
    return {locations, state, error, refresh}

}