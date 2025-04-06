import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Button } from '@mui/material'; // Import du composant Button de Material-UI
import "./map.css";

// Fonction pour charger les données des polygones (à partir de votre API)
const fetchPolygons = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/regions/11/cities-polygon");
    if (!response.ok) {
      throw new Error("Erreur de chargement des données");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des données :", error);
    return []; // Retourne un tableau vide si l'erreur se produit
  }
};

// Fonction pour charger les données des annonces
const fetchCountAnnonces = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/annonces/count");
    if (!response.ok) {
      throw new Error("Erreur de chargement des annonces");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des annonces :", error);
    return [];
  }
};


// Fonction pour charger les données des annonces
const fetchAveragePriceAnnonces = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/annonces/avg-price-per-m2");
    if (!response.ok) {
      throw new Error("Erreur de chargement des annonces");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des annonces :", error);
    return [];
  }
};

const getCountAnnonceByZipCode = (zipCode, data) => {
  // Cherche la ville avec le zipCode correspondant dans le tableau "villes"
  const ville = data.villes.find((ville) => ville.zipCode === zipCode);

  // Si la ville existe, retourne le count. Sinon, retourne 0.
  return ville ? ville.count : 0;
};

const getAveragePriceByZipCode = (zipCode, data) => {
  // Cherche la ville avec le zipCode correspondant dans le tableau "villes"
  const ville = data.villes.find((ville) => ville.zipCode === zipCode);

  // Si la ville existe, retourne le count. Sinon, retourne 0.
  return ville ? ville.avgPricePerM2 : 0;
};

// Fonction pour convertir une commune en GeoJSON
const convertToGeoJSON = (commune, average) => {
  return {
    type: "Feature",
    properties: {
      name: commune.name,
      zipCode: commune.zipCode,
      avgPrice: average, // Exemple de prix moyen
    },
    geometry: {
      type: "Polygon",
      coordinates: [commune.polygon],
    },
  };
};

// Fonction pour obtenir la couleur en fonction du nombre d'annonces
const getColorForNumberOfAdds = (numberOfAdds) => {
  if (numberOfAdds < 1) return "#66000000";
  if (numberOfAdds < 5) return "#00FF00";  // Vert (très peu d'annonces)
  if (numberOfAdds < 10) return "#66FF00";  // Vert clair
  if (numberOfAdds < 20) return "#99FF00";  // Jaune-vert clair
  if (numberOfAdds < 30) return "#FFFF00";  // Jaune
  if (numberOfAdds < 40) return "#FFCC00";  // Jaune-orangé
  if (numberOfAdds < 50) return "#FF9900";  // Orange clair
  if (numberOfAdds < 70) return "#FF7F00";  // Orange
  if (numberOfAdds < 100) return "#FF5500";  // Orange foncé
  if (numberOfAdds < 150) return "#FF3300";  // Rouge orangé
  return "#FF0000";  // Rouge (beaucoup d'annonces)
};
// Fonction pour obtenir la couleur en fonction du prix
const getColorForPrice = (avgPrice) => {
  if (avgPrice < 1) return "#66000000";
  if (avgPrice < 3000) return "#00FF00";  // Vert (prix bas)
  if (avgPrice < 4000) return "#66FF00";  // Vert clair
  if (avgPrice < 5000) return "#99FF00";  // Jaune-vert clair
  if (avgPrice < 6000) return "#FFFF00";  // Jaune
  if (avgPrice < 7000) return "#FFCC00";  // Jaune-orangé
  if (avgPrice < 8000) return "#FF9900";  // Orange clair
  if (avgPrice < 9000) return "#FF7F00";  // Orange
  if (avgPrice < 10000) return "#FF5500";  // Orange foncé
  if (avgPrice < 11000) return "#FF3300";  // Rouge orangé
  return "#FF0000";  // Rouge (prix très élevé)
};

// Composant principal avec le bouton pour changer de critère
const MapWithDynamicZoom = () => {
  const [communesData, setCommunesData] = useState([]);
  const [annoncesParVille, setAnnoncesParVille] = useState(null);
  const [averagePricePrVille, setAveragePriceParVille] = useState(null);
  const [colorBy, setColorBy] = useState("annonces"); // "annonces" ou "prix"
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const polygons = await fetchPolygons();
      const countAnnonces = await fetchCountAnnonces();
      const averagePriceAnnonces = await fetchAveragePriceAnnonces();

      setCommunesData(polygons);
      setAnnoncesParVille(countAnnonces);
      setAveragePriceParVille(averagePriceAnnonces);
    };

    loadData();
  }, []);

  const handleZoomChange = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
  };

  // Fonction pour changer la couleur en fonction du critère
  const getColor = (commune) => {
    if (colorBy === "annonces") {
      const nombreAnnoncesPourMaVille = getCountAnnonceByZipCode(commune.zipCode, annoncesParVille);
      return getColorForNumberOfAdds(nombreAnnoncesPourMaVille);
    } else {
      const prixMoyenPourMaVille = getAveragePriceByZipCode(commune.zipCode, averagePricePrVille)
      console.log("prix moyen pour ma ville : ", prixMoyenPourMaVille);
      return getColorForPrice(prixMoyenPourMaVille);
    }
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const zipCode = feature.properties.zipCode;
      const villeName = feature.properties.name;
      const count = getCountAnnonceByZipCode(zipCode, annoncesParVille);
  
      layer.on("mouseover", function (e) {
        this.bindTooltip(
          `<b>${villeName}</b><br>${count} annonce${count > 1 ? "s" : ""}`,
          { sticky: true }
        ).openTooltip(e.latlng);
      });
  
      layer.on("mouseout", function () {
        this.closeTooltip();
      });
  
      // Empêche l'ouverture de popup au clic
      layer.on("click", function (e) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
      });
    }
  };
  

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapContainer
        center={[48.902705531753895, 2.2006715083823996]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        onZoomEnd={handleZoomChange}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {communesData.length > 0 &&
          communesData.map((commune, index) => {
            const average = getAveragePriceByZipCode(commune.zipCode, averagePricePrVille);
            const geojsonData = convertToGeoJSON(commune, average);

            return (
              <GeoJSON
                key={`city-${index}`}
                data={geojsonData}
                onEachFeature={onEachFeature}
                style={{
                  weight: 2,
                  opacity: 0.6,
                  fillOpacity: 0.6,
                  fillColor: getColor(commune),
                }}
              />
            );
          })}
      </MapContainer>

      {/* Ajout d'un bouton pour changer l'affichage */}
      <Button
        onClick={() => setColorBy(colorBy === "annonces" ? "prix" : "annonces")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #000",
        }}
      >
        {colorBy === "annonces" ? "Afficher par prix" : "Afficher par annonces"}
      </Button>
    </div>
  );
};

export default MapWithDynamicZoom; 