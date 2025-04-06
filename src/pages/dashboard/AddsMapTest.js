import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./map.css";
// import L from "leaflet";

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

// Fonction pour charger les données des annonces (à partir de votre API)
const fetchCountAnnonces = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/annonces/count`);
    if (!response.ok) {
      throw new Error("Erreur de chargement des annonces");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des annonces :", error);
    return []; // Retourne un tableau vide si l'erreur se produit
  }
};

// 🔁 Helper : convertir [lat, lng] ➜ [lng, lat] pour GeoJSON
// const transformToGeoJsonPolygon = (latlngArray) => {
//   const geoJsonCoords = latlngArray.map(([lat, lng]) => [lng, lat]);
//   if (
//     geoJsonCoords.length > 0 &&
//     (geoJsonCoords[0][0] !== geoJsonCoords[geoJsonCoords.length - 1][0] ||
//       geoJsonCoords[0][1] !== geoJsonCoords[geoJsonCoords.length - 1][1])
//   ) {
//     geoJsonCoords.push(geoJsonCoords[0]); // referme le polygone
//   }
//   return [geoJsonCoords];
// };

// 🔁 Convertir commune en GeoJSON
const convertToGeoJSON = (commune) => {
  return {
    type: "Feature",
    properties: {
      name: commune.name,
      zipCode: commune.zipCode,
      avgPrice: 3000,
    },
    geometry: {
      type: "Polygon",
      coordinates: [commune.polygon],
    },
  };
};

// // 🎯 Compter les annonces dans le polygone
// const countAnnoncesInPolygon = (polygonCoords, annonces, zipCode) => {
//   // Vérifier si polygonCoords est un tableau non vide
//   if (!Array.isArray(polygonCoords) || polygonCoords.length === 0 || polygonCoords[0].length === 0) {
//     console.warn("polygonCoords est vide ou invalide :", polygonCoords);
//     return 0;  // Retourner 0 si le polygone est vide
//   }

//   // Convertir les coordonnées du polygone en format Leaflet
//   const leafletCoords = polygonCoords.map(([lat, lng]) => [lat, lng]);
//   const poly = L.polygon(leafletCoords);

//   let count = 0;

//   annonces.forEach((annonce) => {
//     if (
//       annonce &&
//       typeof annonce.latitude === "number" &&
//       typeof annonce.longitude === "number"
//     ) {
//       const latLng = L.latLng(annonce.latitude, annonce.longitude);
      
//       if (poly.getBounds().contains(latLng)) {
//         console.log("L'annonce de la ville ", annonce.zipCode, " est dans la ville ", zipCode);
//         count++;
//       } else {
//         console.log("L'annonce de la ville ", annonce.zipCode, " n'est pas dans la ville ", zipCode);
//       }
//     }
//   });

//   return count;
// };

// 🎨 Style de base
const defaultStyle = () => ({
  weight: 2,
  opacity: 0.2,
  fillOpacity: 0.2
});

// // 🔁 Style en fonction du prix
// const getColorForPrice = (price) => {
//   if (price < 1000) return "#FF0000";
//   if (price < 2000) return "#FF7F00";
//   if (price < 3000) return "#FFFF00";
//   return "#00FF00";
// };

const getColorForNumberOfAdds = (numberOfAdds) => {
  if (numberOfAdds < 1) return "#66000000";
  if (numberOfAdds < 10) return "#00FF00";
  if (numberOfAdds < 30) return "#FFFF00";
  if (numberOfAdds < 50) return "#FF7F00";
  return "#FF0000";
};

// 📍 Popup + survol
const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    layer.bindPopup(
      `<b>${feature.properties.name}</b><br>Code Postal: ${feature.properties.zipCode}<br>Prix moyen: ${feature.properties.avgPrice} €/m²`
    );
  }

  layer.on("mouseover", () => {
    layer.setStyle({
      weight: 2,
      opacity: 0.6
    });
  });

  layer.on("mouseout", () => {
    layer.setStyle({
      weight: 0
    })
  });
};

const getCountByZipCode = (zipCode, data) => {
  // Cherche la ville avec le zipCode correspondant dans le tableau "villes"
  const ville = data.villes.find((ville) => ville.zipCode === zipCode);

  console.log("ville : ", ville);

  // Si la ville existe, retourne le count. Sinon, retourne 0.
  return ville ? ville.count : 0;
};

// 🌍 Composant principal
const MapWithDynamicZoom = () => {
  const [communesData, setCommunesData] = useState([]);
  // const [annoncesData, setAnnoncesData] = useState([]);
  const [annoncesParVille, setAnnoncesParVille] = useState(null);
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const polygons = await fetchPolygons();
      // const annonces = await fetchAnnonces();
      const countAnnonces = await fetchCountAnnonces();

      console.log("je compte les annonces", countAnnonces);

      console.log("voici les données de ville : ", polygons);
      
      setCommunesData(polygons);
      // setAnnoncesData(annonces);
      setAnnoncesParVille(countAnnonces);
    };

    loadData();
  }, []);

  const handleZoomChange = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
  };

  return (
    <MapContainer
      center={[48.902705531753895, 2.2006715083823996]}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
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
          const geojsonData = convertToGeoJSON(commune);
          // const count = countAnnoncesInPolygon([commune.polygon], annoncesData, commune.zipCode);
          const nombreAnnoncesPourMaVille = getCountByZipCode(commune.zipCode, annoncesParVille);

          return (
            <GeoJSON
              key={`city-${index}`}
              data={geojsonData}
              onEachFeature={(feature, layer) => {
                onEachFeature(feature, layer);
                layer.bindTooltip(`${nombreAnnoncesPourMaVille} annonces`, {
                  permanent: false,
                  direction: "top",
                });
              }}
              style={{
                ...defaultStyle(),
                fillColor: getColorForNumberOfAdds(nombreAnnoncesPourMaVille),

              }}
            />
          );
        })}
    </MapContainer>
  );
};

export default MapWithDynamicZoom;
