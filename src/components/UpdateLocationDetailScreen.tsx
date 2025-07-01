import { useParams } from "react-router";

//todo implementieren
const UpdateLocationDetailScreen = () => {
    const {locationId} = useParams<{locationId: string}>();
    return (
        <h1>{`Update Location ${locationId}`}</h1>
    )
}

export default UpdateLocationDetailScreen;