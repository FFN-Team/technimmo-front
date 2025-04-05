import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

// Icône personnalisée
const customIcon = new L.Icon({
  iconUrl: require("../../assets/images/icons/map_location_icon.png"),
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const createCustomClusterIcon = (cluster) => {
  return L.divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    className: "custom-marker-cluster",
    iconSize: [33, 33]
  });
};

const Map = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/annonces")
      .then(res => res.json())
      .then(data => {
        const validData = data.filter(a => a.latitude && a.longitude);
        setAnnonces(validData);
      })
      .catch(err => {
        console.error("Erreur fetch API:", err);
      });
  }, []);

  return (
    <MapContainer center={[46.5, 2.5]} zoom={6} style={{ height: "100vh" }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap'
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {annonces.map((annonce, index) => (
          <Marker
            key={index}
            position={[annonce.latitude, annonce.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>CP : </strong>{annonce.zipCode}<br />
              <strong>Prix : </strong>{annonce.price} €
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;