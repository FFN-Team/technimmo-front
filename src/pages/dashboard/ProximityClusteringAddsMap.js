import { useEffect, useState } from "react";
import "./map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Icône personnalisée
const customIcon = L.icon({
  iconUrl: require("../../assets/images/icons/map_location_icon.png"),
  iconSize: [38, 38],
});

// Fonctions de style cluster
const getClusterColor = (count) => {
  if (count < 10) return "#27ae60";
  if (count < 30) return "#f1c40f";
  if (count < 50) return "#e67e22";
  return "#e74c3c";
};

const getClusterSize = (count) => {
  if (count < 10) return 40;
  if (count < 30) return 45;
  if (count < 50) return 50;
  return 55;
};

const createCustomClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const color = getClusterColor(count);
  const size = getClusterSize(count);

  return L.divIcon({
    html: `<div class="cluster-icon" style="background-color: ${color}; width: ${size}px; height: ${size}px; line-height: ${size}px; font-size: 14px;">
            ${count}</div>`,
    className: "custom-marker-cluster",
    iconSize: [size, size],
  });
};

// Centrage auto
const MapController = ({ markers }) => {
  const map = useMap();
  useEffect(() => {
    if (markers.length) {
      const bounds = markers.reduce((bounds, marker) => {
        return bounds.extend([marker.latitude, marker.longitude]);
      }, L.latLngBounds([]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("cluster"); // 'cluster' ou 'heatmap'

  useEffect(() => {
    fetch("http://localhost:5000/api/annonces")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setMarkers(data);
        else {
          console.error("Données non valides :", data);
          setMarkers([]);
        }
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
        setMarkers([]);
      });
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapController markers={markers} />

        {mode === "heatmap" && (
          <HeatmapLayer
            points={markers}
            longitudeExtractor={(m) => m.longitude}
            latitudeExtractor={(m) => m.latitude}
            intensityExtractor={(m) => m.price}
            radius={20}
            blur={15}
            max={10000}
          />
        )}

        {mode === "cluster" && (
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={[marker.latitude, marker.longitude]}
                icon={customIcon}
              >
                <Popup>
                  {marker.zipCode} : {marker.price} €
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>

      {/* Toggle Button pour changer de mode */}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(event, newMode) => {
          if (newMode !== null) setMode(newMode);
        }}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 3,
        }}
        size="small"
      >
        <ToggleButton value="cluster" aria-label="Clusters">
          <LocationOnIcon fontSize="small" />
          &nbsp; Clusters
        </ToggleButton>
        <ToggleButton value="heatmap" aria-label="Heatmap">
          <WhatshotIcon fontSize="small" />
          &nbsp; Heatmap
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default Map;