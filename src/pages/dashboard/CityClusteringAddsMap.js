import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import "./map.css";
import Legend from "./Legend";
import CitySideBar from "./CitySideBar";
import { ToggleButton, ToggleButtonGroup, FormGroup, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import { FormatListBulleted, Euro } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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

// Fonction pour charger les annonces favoris
const fetchFavoris = async () => {
  try {
    const response = await fetch("http://localhost:5000/best-favorites"); // remplace avec ta vraie URL si besoin
    if (!response.ok) {
      throw new Error("Erreur de chargement des annonces géolocalisées");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur de récupération des annonces géo :", error);
    return [];
  }
};

// fonctions pour charger les annonces stagnantes
const fetchBadAdds = async () => {
  try {
    const response = await fetch("http://localhost:5000/bad-ads"); // remplace avec ta vraie URL si besoin
    if (!response.ok) {
      throw new Error("Erreur de chargement des annonces géolocalisées");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur de récupération des annonces géo :", error);
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

const MapWithDynamicZoom = () => {
  const [communesData, setCommunesData] = useState([]);
  const [annoncesParVille, setAnnoncesParVille] = useState(null);
  const [averagePricePrVille, setAveragePriceParVille] = useState(null);
  const [mode, setMode] = useState("annonces");
  const [zoom, setZoom] = useState(11);
  const mapRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [favoris, setFavoris] = useState([]);
  const [showFavorites, setShowFavorites] = useState("true");
  const [badAdds, setBadAdds] = useState([]);
  const [showBadAdds, setShowBadAdds] = useState("false");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Démarre le chargement
  
      const polygons = await fetchPolygons();
      const countAnnonces = await fetchCountAnnonces();
      const averagePriceAnnonces = await fetchAveragePriceAnnonces();
      const favorisData = await fetchFavoris();
      const badAddsData = await fetchBadAdds();
  
      setCommunesData(polygons);
      setAnnoncesParVille(countAnnonces);
      setAveragePriceParVille(averagePriceAnnonces);
      setFavoris(favorisData);
      setBadAdds(badAddsData);
  
      setLoading(false); // Termine le chargement
    };
  
    loadData();
  }, []);

  const handleZoomChange = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
  };

  const getColor = (mode, average, count) => {
    if (mode === "annonces") return getColorForNumberOfAdds(count);
    else return getColorForPrice(average);
  };

  const onEachFeature = (feature, layer, average, count) => {
    if (feature.properties) {
      const villeName = feature.properties.name;

      layer.on("mouseover", function (e) {
        let tooltipContent = `
          <div style="padding: 6px; font-size: 13px;">
            <strong>${villeName}</strong><br/>
            ${count} annonce${count > 1 ? "s" : ""}
            <br/>${average.toLocaleString()} €/m²
          </div>`;
        this.bindTooltip(tooltipContent, { sticky: true }).openTooltip(e.latlng);
      });

      layer.on("mouseout", function () {
        this.closeTooltip();
      });

      layer.on("click", function () {
        setLoading(true)
        setSelectedCity(null)
        setSelectedCity({
          name: feature.properties.name,
          zipCode: feature.properties.zipCode,
          averagePrice: average,
          annoncesCount: count,
        });
        setLoading(false)
      });
    }
  };

  const handleChangeFavoriCheckBox = () => {
    if (showFavorites === "true") {
      setShowFavorites("false");
    } else  {
      setShowFavorites("true");
    }
  }

  const handleChangeBadAddsCheckBox = () => {
    if (showBadAdds === "true") {
      setShowBadAdds("false");
    } else  {
      setShowBadAdds("true");
    }
  }

  return (
      <div style={{ position: "relative", height: "100vh", background: "#f4f6f9" }}>
        {loading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1500,
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <CircularProgress size={60} thickness={5} />
            <div style={{ marginTop: "1rem", fontSize: "1.2rem", fontWeight: "500" }}>Chargement des données...</div>
          </div>
        )}
      <MapContainer
        center={[48.8317, 2.2006]}
        zoom={zoom}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        zoomControl={true}
        dragging={true} // ou false pour une carte totalement figée
        style={{
          height: "100%",
          width: "100%",
          filter: selectedCity ? "blur(1px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        onZoomEnd={handleZoomChange}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {communesData.length > 0 &&
          communesData.map((commune, index) => {
            const average = getAveragePriceByZipCode(
              commune.zipCode,
              averagePricePrVille
            );
            const count = getCountAnnonceByZipCode(
              commune.zipCode,
              annoncesParVille
            );
            const geojsonData = convertToGeoJSON(commune, average);

            return (
              <div key={`commune-${index}`}>
                <GeoJSON
                  data={geojsonData}
                  onEachFeature={(feature, layer) =>
                    onEachFeature(feature, layer, average, count)
                  }
                  style={{
                    weight: 1,
                    opacity: 0.4,
                    color: "#333",
                    fillOpacity: 0.6,
                    fillColor: getColor(mode, average, count),
                    borderRadius: "10px",
                  }}
                />

                {showFavorites === "true" && favoris.map((annonce, idx) => (
                  <CircleMarker
                    key={`annonce-${idx}`}
                    center={[annonce.lat, annonce.lng]}
                    radius={5 + annonce.favorites / 100}
                    fillColor="#e91e63"
                    color="#ffffff"
                    weight={1}
                    fillOpacity={0.7}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                      <span>
                        <b>Annonces</b><br />
                        {annonce.favorites} favoris<br />
                        Code postal : {annonce.zipcode}<br/>
                        <a href={annonce.url} target="_blank" rel="noopener noreferrer">Voir lannonce</a>
                      </span>
                    </Tooltip>
                  </CircleMarker>
                ))}

                {showBadAdds === "true" && badAdds.map((annonce, idx) => (
                  <CircleMarker
                    key={`annonce-${idx}`}
                    center={[annonce.lat, annonce.lng]}
                    radius={5 + annonce.days_difference / 100}
                    fillColor="#ff9800"
                    color="#ffffff"
                    weight={1}
                    fillOpacity={0.7}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                      <span>
                        <b>Annonces</b><br />
                        Date de première publication : {annonce.first_publication_date}<br />
                        Code postal : {annonce.zipcode}<br/>
                        <a href={annonce.url} target="_blank" rel="noopener noreferrer">Voir lannonce</a>
                      </span>
                    </Tooltip>
                  </CircleMarker>
                ))}

              </div>
            );
          })}
      </MapContainer>

      <FormGroup
  sx={{
    position: "absolute",
    top: 80,
    left: 10,
    zIndex: 1000,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "12px",
    boxShadow: 5,
    padding: "12px 16px",
    gap: 1,
    minWidth: "220px",
    "& .MuiFormControlLabel-root": {
      marginLeft: 0,
      alignItems: "center",
    },
  }}
>
  <FormControlLabel
    control={
      <Checkbox
        defaultChecked
        icon={<FavoriteBorderIcon sx={{ color: "#999" }} />}
        checkedIcon={<FavoriteIcon sx={{ color: "#e91e63" }} />}
        onChange={handleChangeFavoriCheckBox}
        sx={{
          transition: "all 0.3s ease-in-out",
          "&.Mui-checked": {
            transform: "scale(1.2)",
          },
        }}
      />
    }
    label="Annonces populaires"
  />
  <FormControlLabel
    control={
      <Checkbox
        icon={<AccessTimeIcon sx={{ color: "#999" }} />}
        checkedIcon={<AccessTimeFilledIcon sx={{ color: "#ff9800" }} />}
        onChange={handleChangeBadAddsCheckBox}
        sx={{
          transition: "all 0.3s ease-in-out",
          "&.Mui-checked": {
            transform: "scale(1.2)",
          },
        }}
      />
    }
    label="Annonces stagnantes"
  />
</FormGroup>

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(event, newValue) => {
          if (newValue !== null) setMode(newValue);
        }}
        sx={{
          position: "absolute",
          top: 20,
          left: 50,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          boxShadow: 5,
          padding: "4px",
          "& .MuiToggleButton-root": {
            textTransform: "none",
            padding: "6px 12px",
            fontSize: "14px",
            transition: "all 0.2s ease-in-out",
          },
        }}
        size="small"
      >
        <ToggleButton value="annonces" aria-label="Annonces">
          <FormatListBulleted fontSize="small" />
          &nbsp; Annonces
        </ToggleButton>
        <ToggleButton value="prix" aria-label="Prix">
          <Euro fontSize="small" />
          &nbsp; Prix
        </ToggleButton>
      </ToggleButtonGroup>

      <Legend type={mode} />
      
      {selectedCity && (
          <CitySideBar
            selectedCity={selectedCity}
            onClose={() => setSelectedCity(null)}
          />
        )}

      </div>
  );
};

export default MapWithDynamicZoom;