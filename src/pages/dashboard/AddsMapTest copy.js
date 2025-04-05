// import React, { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fetch des polygones depuis ton API Flask
// const fetchPolygons = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/france-polygon");
//     if (!response.ok) throw new Error("Erreur de chargement des données");
//     return await response.json();
//   } catch (error) {
//     console.error("Erreur de récupération :", error);
//     return [];
//   }
// };

// const MapWithPolygons = () => {
//   const [communesData, setCommunesData] = useState([]);
//   const mapInstance = useRef(null);

//   // Charger les données au démarrage
//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchPolygons();
//       setCommunesData(data);
//     };
//     loadData();
//   }, []);

//   // Une fois la carte prête, ajout des polygones
//   const handleMapReady = (mapInstance) => {
//     console.log("Carte prête !", mapInstance);

//     var polygon = L.polygon([[45.9828, 5.4302], [45.9851, 5.4349], [45.9978, 5.4411], [46.0172, 5.4447], [46.0256, 5.4416], [46.0307, 5.4359], [46.0315, 5.4249], [46.0232, 5.4206], [46.0078, 5.4044], [45.997, 5.426], [45.9865, 5.4245], [45.9828, 5.4302]], {
//       color: "red",
//       weight: 1,
//       fillOpacity: 0.2,
//     })
//     console.log(polygon)
//     polygon.addTo(mapInstance.current)

//     console.log("handleMapReady : ", communesData)

//     // Ajouter les polygones une fois que la carte est initialisée
//     communesData.forEach((commune) => {
//         const polygon = L.polygon(commune.polygon, {
//           color: "red",
//           weight: 1,
//           fillOpacity: 0.2,
//         });
//         polygon.bindPopup(`<b>${commune.name}</b><br/>${commune.zipCode}`);
//         polygon.addTo(mapInstance); // Ajoute le polygone à la carte
//     });
//   };

//   return (
//     <MapContainer
//       center={[46.603354, 1.888334]} // Coordonnées de la France
//       zoom={6}
//       style={{ height: "100vh", width: "100%" }}
//       whenReady={(event) => {
//         // whenReady garantit que la carte est complètement initialisée
//         console.log("Carte complètement prête !");
//         mapInstance.current = event.target; // La carte est dans l'objet 'target' de l'événement
//         handleMapReady(mapInstance); // Ajoute les polygones à la carte
//       }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//     </MapContainer>
//   );
// };

// export default MapWithPolygons;


import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fetch des polygones depuis ton API Flask
const fetchPolygons = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/france-polygon");
    if (!response.ok) throw new Error("Erreur de chargement des données");
    return await response.json();
  } catch (error) {
    console.error("Erreur de récupération :", error);
    return [];
  }
};

const MapWithPolygons = () => {
  const [communesData, setCommunesData] = useState([]); // Données des communes
  const mapInstance = useRef(null); // Référence à la carte Leaflet

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPolygons();
      setCommunesData(data); // Mettre à jour les données des communes
      console.log("communes data est ready");
    };
    loadData();
  }, []); // Une seule fois lors du montage du composant

  // Une fois la carte prête et communesData chargé, ajout des polygones
  useEffect(() => {
    if (!mapInstance.current) return; // Si communesData est vide ou la carte n'est pas prête, on ne fait rien

    // Ajouter un polygone de test (si nécessaire)
    const testPolygon = L.polygon(
      [
        [45.9828, 5.4302],
        [45.9851, 5.4349],
        [45.9978, 5.4411],
        [46.0172, 5.4447],
        [46.0256, 5.4416],
        [46.0307, 5.4359],
        [46.0315, 5.4249],
        [46.0232, 5.4206],
        [46.0078, 5.4044],
        [45.997, 5.426],
        [45.9865, 5.4245],
        [45.9828, 5.4302]
      ],
      {
        color: "red",
        weight: 1,
        fillOpacity: 0.2,
      }
    );
    testPolygon.addTo(mapInstance.current); // Ajouter ce polygone de test à la carte

    console.log("on teste communes data : ", communesData);

    if(!communesData.length) return;

    console.log("est-ce que on va là ?");

    // Ajouter les polygones de communesData
    communesData.forEach((commune) => {
      console.log("on va là également ?");
      const polygon = L.polygon(commune.polygon, {
        color: "red",
        weight: 1,
        fillOpacity: 0.2,
      });
      polygon.addTo(mapInstance.current); // Ajouter chaque polygone à la carte
    });
  }, [communesData, mapInstance]); // Dépend de communesData pour se déclencher

  return (
    <MapContainer
      center={[46.603354, 1.888334]} // Coordonnées de la France
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
      whenReady={(event) => {
        console.log("Carte complètement prête !");
        mapInstance.current = event.target; // La carte est dans l'objet 'target' de l'événement
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );
};

export default MapWithPolygons;