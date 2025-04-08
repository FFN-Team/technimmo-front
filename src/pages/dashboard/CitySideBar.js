import React, { useEffect, useState } from 'react';
import './citySidebar.css';
import {CircularProgress } from "@mui/material";

const CitySidebar = ({ selectedCity, onClose }) => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState("true");

  useEffect(() => {
    const fetchCity = async () => { // Démarre le chargement
      const res = await fetch(`http://localhost:5000/api/cities/${selectedCity.zipCode}`);
      const data = await res.json();
      setCity(data[0]);
      setLoading("false"); // Termine le chargement
    };
    if (selectedCity.zipCode) {
      setCity(null);
      setLoading("true");
      fetchCity();
    }
  }, [selectedCity.zipCode]);

  return (
    <div className="sidebar" style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "320px",
        height: "100%",
        backgroundColor: "white", // nude background
        zIndex: 1100,
        boxShadow: "-2px 0 12px rgba(0,0,0,0.1)",
        padding: "24px",
        overflowY: "auto",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#4b3b2a" // doux brun
      }}>

        {loading === "true" && (
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
        <button onClick={onClose} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "transparent",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer",
          color: "#a88c7d"
        }}>✕</button>

        {loading === "false" && (
          <div>
            <h2 style={{ marginTop: 40, fontSize: "1.5rem", fontWeight: "600" }}>{selectedCity.name}</h2>
            <p><strong>Annonces :</strong> {selectedCity.annoncesCount}</p>
            <p><strong>Prix moyen :</strong> {selectedCity.averagePrice.toLocaleString()} €/m²</p>
          
            <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #e5d5cc" }} />
          
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: 10 }}>{city.nom_standard}</h3>
            <p><strong>Population :</strong> {city.population.toLocaleString()}</p>
            <p><strong>Superficie :</strong> {city.superficie_km2} km²</p>
            <p><strong>Densité :</strong> {city.densite} hab/km²</p>
            <p><strong>Relief :</strong> {city.altitude_minimale} – {city.altitude_maximale} m</p>
            <p><strong>Type de commune :</strong> {city.grille_densite_texte}</p>
            <p><strong>Équipements :</strong> {city.niveau_equipements_services_texte}</p>
            <p><strong>Département :</strong> {city.dep_nom}</p>
            <p><strong>Région :</strong> {city.reg_nom}</p>
          
            <div className="links" style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <a href={city.url_wikipedia} target="_blank" rel="noreferrer" style={{
                color: "#a88c7d",
                textDecoration: "none",
                fontWeight: "500"
              }}>🌐 Wikipedia</a>
              <a href={city.url_villedereve} target="_blank" rel="noreferrer" style={{
                color: "#a88c7d",
                textDecoration: "none",
                fontWeight: "500"
              }}>🏡 Ville de Rêve</a>
            </div>
          </div>
        )}
      </div>
      
  );
};

export default CitySidebar;