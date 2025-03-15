import { useEffect, useState } from "react";
import "./map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";


// Icône personnalisée
const customIcon = L.icon({
    iconUrl: require("../../assets/images/icons/map_location_icon.png"),
    iconSize: [38, 38]
});

const createCustomClusterIcon = (cluster) => {
    return L.divIcon({
        html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
        className: "custom-marker-cluster",
        iconSize: [33, 33]
    });
};

const Map = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/annonces")
            .then(response => response.json())
            .then(data => {
                console.log("Données reçues :", data);  // Debug ici
                if (Array.isArray(data)) {
                    setMarkers(data);
                } else {
                    console.error("Les données ne sont pas un tableau :", data);
                    setMarkers([]);  // Évite le crash
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des annonces :", error);
                setMarkers([]);  // Évite le crash en cas d'erreur
            });
    }, []);

    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.latitude, marker.longitude]} icon={customIcon}>
                        <Popup>
                            {marker.city}: {marker.price} €
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default Map;