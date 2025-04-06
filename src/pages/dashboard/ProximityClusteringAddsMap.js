import { useEffect, useState } from "react";
import "./map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Icône personnalisée pour les annonces
const customIcon = L.icon({
  iconUrl: require("../../assets/images/icons/map_location_icon.png"),
  iconSize: [38, 38],
});

// Couleur du cluster selon le nombre d'annonces
const getClusterColor = (count) => {
  if (count < 10) return "#27ae60";      // Vert
  if (count < 30) return "#f1c40f";      // Jaune
  if (count < 50) return "#e67e22";      // Orange
  return "#e74c3c";                      // Rouge
};

// Taille dynamique du cluster
const getClusterSize = (count) => {
  if (count < 10) return 40;
  if (count < 30) return 45;
  if (count < 50) return 50;
  return 55;
};

// Cluster personnalisé
const createCustomClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const color = getClusterColor(count);
  const size = getClusterSize(count);

  return L.divIcon({
    html: `
      <div class="cluster-icon" style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        line-height: ${size}px;
        font-size: 14px;
      ">
        ${count}
      </div>
    `,
    className: "custom-marker-cluster",
    iconSize: [size, size],
  });
};

const Map = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/annonces")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setMarkers(data);
        else {
          console.error("Les données ne sont pas un tableau :", data);
          setMarkers([]);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
        setMarkers([]);
      });
  }, []);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.latitude, marker.longitude]} icon={customIcon}>
            <Popup>
              {marker.zipCode} : {marker.price} €
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
