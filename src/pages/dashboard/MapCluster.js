import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const customIcon = L.icon({
  iconUrl: require("../../assets/images/icons/map_location_icon.png"),
  iconSize: [38, 38]
});

const getColorForCluster = (count) => {
  if (count < 10) return "#00FF00";
  if (count < 30) return "#FFFF00";
  if (count < 50) return "#FF7F00";
  return "#FF0000";
};

const createCustomClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const color = getColorForCluster(count);

  return L.divIcon({
    html: `<div class="cluster-icon" style="background-color: ${color};">${count}</div>`,
    className: "custom-marker-cluster",
    iconSize: [33, 33]
  });
};

const MapClusters = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/annonces")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setMarkers(data))
      .catch((err) => console.error("Erreur annonces:", err));
  }, []);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "80vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
          >
            <Popup>
              {marker.zipCode}: {marker.price} €
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapClusters;