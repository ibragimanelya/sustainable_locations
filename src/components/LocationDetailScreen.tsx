import { useParams } from "react-router";

//todo Screen implementieren

const LocationDetailScreen = () => {
    const {locationId} = useParams<{locationId: string}>();
    return <h1>{`Location ${locationId}`}</h1>
}

export default LocationDetailScreen;