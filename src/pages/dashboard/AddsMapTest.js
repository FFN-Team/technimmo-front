import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// // Fonction pour charger les données des polygones (à partir de votre API)
// const fetchPolygons = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/france-polygon");
//     if (!response.ok) {
//       throw new Error("Erreur de chargement des données");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erreur de récupération des données :", error);
//     return []; // Retourne un tableau vide si l'erreur se produit
//   }
// };

// // Fonction pour charger les données des annonces (à partir de votre API)
// const fetchAnnonces = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/annonces");
//     if (!response.ok) {
//       throw new Error("Erreur de chargement des annonces");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erreur de récupération des annonces :", error);
//     return []; // Retourne un tableau vide si l'erreur se produit
//   }
// };

  // Fonction pour compter les annonces dans un polygone
  const countAnnoncesInPolygon = (polygon, annonces) => {

    console.log("polygon",polygon)

    const poly = L.polygon(polygon); // Créer un objet Polygon Leaflet
    let count = 0;
  
    console.log("Bounds du polygone :", poly.getBounds())  // Affiche les limites du polygone
  
    annonces.forEach((annonce) => {
      // Vérifie si 'latitude' et 'longitude' existent
      if (annonce[0] && annonce[1]) {
        const latLng = L.latLng(annonce[0], annonce[1]);
  
        // Vérifier si le point est à l'intérieur du polygone
        if (poly.getBounds().contains(latLng)) {
          console.log(`Annonce à ${annonce.latitude}, ${annonce.longitude} est à l'intérieur du polygone`);
          count++; // Incrémente si l'annonce est dans le polygone
        } else {
          console.log(`Annonce à ${annonce.latitude}, ${annonce.longitude} est à l'extérieur du polygone`);
        }
      } else {
        console.warn("Annonce sans latitude ou longitude :", annonce);  // Avertissement pour les annonces manquantes de ces propriétés
      }
    });
  
    return count;
  };

  // Fonction pour styliser les polygones (ex. changement de couleur au survol)
  const defaultStyle = () => ({
    weight: 1,
    opacity: 0,
    fillOpacity: 0,
  });

  const hoverStyle = () => ({
    weight: 2,
    opacity: 0.75,
    fillOpacity: 0.5,
  });

  // Fonction pour afficher les popups avec des informations
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(
        `<b>${feature.properties.name}</b><br>Code Postal: ${feature.properties.zipCode}<br>Prix moyen: ${feature.properties.avgPrice}`
      );
    }

    // Ajouter les événements de survol
    layer.on("mouseover", () => {
      layer.setStyle(hoverStyle());  // Appliquer un style différent au survol
    });

    layer.on("mouseout", () => {
      layer.setStyle(defaultStyle());  // Restaurer le style par défaut quand on quitte le survol
    });
  };

  // Convertir les données pour chaque commune en GeoJSON
  const convertToGeoJSON = (commune) => {
    return {
      type: "Feature",
      properties: {
        name: commune.name,
        zipCode: commune.zipCode,
        avgPrice: commune.avgPrice, // Ajouter le prix moyen pour chaque commune
      },
      geometry: {
        type: "Polygon",  // ou "MultiPolygon" si c'est le cas
        coordinates: [commune.polygon],  // Assurez-vous que c'est un tableau de coordonnées
      },
    };
  };

  // Fonction pour styliser le polygone en fonction du prix moyen
  const getColorForPrice = (price) => {
    if (price < 1000) return "#FF0000"; // Moins de 1000 €/m² : rouge
    if (price < 2000) return "#FF7F00"; // Moins de 2000 €/m² : orange
    if (price < 3000) return "#FFFF00"; // Moins de 3000 €/m² : jaune
    return "#00FF00"; // Plus de 3000 €/m² : vert
  };

  

const MapWithDynamicZoom = () => {
  const [communesData, setCommunesData] = useState([]);
  const [annoncesData, setAnnoncesData] = useState([]);
  const [zoom, setZoom] = useState(6); // Niveau de zoom initial
  const mapRef = useRef(null);

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      // const polygons = await fetchPolygons();
      // const annonces = await fetchAnnonces();
      setCommunesData([
        [48.8566, 2.3522],  // Paris
        [48.8560, 2.3420],  // Coordonnée proche de Paris
        [48.8570, 2.3570]   // Coordonnée proche de Paris
      ]);
      setAnnoncesData([
        { latitude: 48.8565, longitude: 2.3530 },  // À l'intérieur du polygone
        { latitude: 48.8600, longitude: 2.3500 },  // À l'extérieur du polygone
        { latitude: 48.8575, longitude: 2.3550 },  // À l'intérieur du polygone
        { latitude: 48.8590, longitude: 2.3400 },  // À l'extérieur du polygone
      ]); // Assurez-vous que le format est correct
    };

    loadData();
  }, []);
  
  // Met à jour le zoom lorsque l'utilisateur change le zoom de la carte
  const handleZoomChange = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.leafletElement.getZoom());
    }
  };

  return (
    <MapContainer
      center={[46.603354, 1.888334]} // Centrer sur la France
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
      ref={mapRef}
      onZoomEnd={handleZoomChange} // Écouteur de changement de zoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
      />
      
      {/* Si les données des polygones sont chargées, on les ajoute à la carte */}
      {communesData.length > 0 && (
        communesData.map((commune, index) => {
          const geojsonData = convertToGeoJSON(commune);
          
          // Compter les annonces dans le polygone
          const count = countAnnoncesInPolygon(commune, annoncesData);

          const cityLayer = (
            <GeoJSON
              key={`city-${index}`}
              data={geojsonData}
              onEachFeature={(feature, layer) => onEachFeature(feature, layer, count)}
              style={() => ({
                ...defaultStyle(),
                fillColor: getColorForPrice(commune.avgPrice),  // Applique la couleur en fonction du prix moyen
              })}
            />
          );
          
          // Afficher les polygones en fonction du zoom
          if (zoom < 10) {
            return cityLayer;  // Afficher les polygones pour les villes au zoom faible
          } else if (zoom >= 10 && zoom < 12) {
            return null;  // Ne pas afficher les polygones des villes au zoom élevé
          }
          
          return null;
        })
      )}
    </MapContainer>
  );
};

export default MapWithDynamicZoom;