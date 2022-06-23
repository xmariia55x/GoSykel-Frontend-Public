import { useEffect, useState } from "react";
import * as Location from "expo-location";

const PERIOD = 5000;
const ALERT_ERROR_MESSAGE = 'Se ha producido un fallo, ponte en contacto con los administradores de la aplicación';
export default useLocation = () => {
    const [location, setLocation] = useState([]);

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                enableHighAccuracy: true
            });
            setLocation((oldLocation) => [...oldLocation, { latitude, longitude, time: Math.floor(Date.now() / 1000) }]); 
        } catch (error) {
            console.log(error.message);
            alert(ALERT_ERROR_MESSAGE)
        }
    };

    useEffect(() => {
        const locationInterval = setInterval(() => {
            const loc = getLocation();

        }, PERIOD);
        return () => clearInterval(locationInterval);
    }, []);
    return location;
};
