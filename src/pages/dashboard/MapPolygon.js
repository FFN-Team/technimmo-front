import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fetchPolygons = async () => {
  const res = await fetch("http://localhost:5000/api/regions/11/cities-polygon");
  return res.ok ? await res.json() : [];
};

const convertToGeoJSON = (commune) => ({
  type: "Feature",
  properties: {
    name: commune.name,
    zipCode: commune.zipCode,
    avgPrice: commune.avgPrice || 3000,
  },
  geometry: {
    type: "Polygon",
    coordinates: [commune.polygon],
  },
});

const getColorForPrice = (price) => {
  if (price < 1000) return "#FF0000";
  if (price < 2000) return "#FF7F00";
  if (price < 3000) return "#FFFF00";
  return "#00FF00";
};

const defaultStyle = () => ({
  weight: 2,
  opacity: 0.2,
  fillOpacity: 0.4,
});

const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    const { name, zipCode, avgPrice } = feature.properties;
    layer.bindPopup(`<b>${name}</b><br>Code Postal: ${zipCode}<br>Prix moyen: ${avgPrice} €/m²`);
  }
};

const MapPolygons = () => {
  const [communesData, setCommunesData] = useState([]);

  useEffect(() => {
    fetchPolygons().then(setCommunesData);
  }, []);

  return (
    <MapContainer
      center={[48.9027, 2.2006]}
      zoom={12}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {communesData.map((commune, index) => {
        const geojsonData = convertToGeoJSON(commune);
        return (
          <GeoJSON
            key={`city-${index}`}
            data={geojsonData}
            onEachFeature={onEachFeature}
            style={{
              ...defaultStyle(),
              fillColor: getColorForPrice(geojsonData.properties.avgPrice),
            }}
          />
        );
      })}
    </MapContainer>
  );
};

export default MapPolygons;