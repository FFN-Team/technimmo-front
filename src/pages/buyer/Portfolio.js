import Card from 'pages/components/Card.js';
import PropertiesTable from './PortfolioPropertiesTable';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {CircularProgress, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

const Portfolio = () => {
    const { id } = useParams();
    const [propertiesToFollow, setPropertiesToFollow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("false");

  useEffect(() => {
    const fetchPropertiesToFollowDataFromBuyerId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}/properties-to-follow`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPropertiesToFollow(data);
      } catch (error) {
        setError("true");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesToFollowDataFromBuyerId();
  }, []);

  const refreshPropertiesToFollow = async () => {
    try {
      const url = `http://localhost:9001/api/v1/buyers/${id}/properties-to-follow`;
      await fetch(url, {
        method: 'PUT',
      });

      window.location.reload();
    } catch (error) {
        setError("true");
      console.error("Une erreur s'est produite lors de la réinitialisation des propriétés à suivre :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ position: "relative", padding: "2rem" }}>
      {loading === "true" && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1500,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2.5rem 3rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <CircularProgress size={60} thickness={5} />
          <div style={{ marginTop: "1.2rem", fontSize: "1.2rem", fontWeight: 500 }}>
            Chargement des données...
          </div>
        </div>
      )}

    {error === "true" && (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1500,
            backgroundColor: "rgba(255, 235, 238, 0.95)", // rouge clair
            padding: "2.5rem 3rem",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
            color: "#c62828", // rouge vif
            maxWidth: "90%",
            width: "fit-content"
        }}>
            <div style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            🚨 Une erreur est survenue
            </div>
            <button
            onClick={() => {
                setError("false")
            }
            }
            style={{
                padding: "0.6rem 1.2rem",
                fontSize: "1rem",
                backgroundColor: "#c62828",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
            }}
            >
            ⬅ Retour
            </button>
        </div>
        )}


      <Card style={{ padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem"
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>🏘️ Propriétés à suivre</p>
          <Button
            onClick={refreshPropertiesToFollow}
            variant="contained"
            startIcon={propertiesToFollow.length === 0 ? <SearchIcon /> : <RefreshIcon />}
            color={propertiesToFollow.length === 0 ? "primary" : "secondary"}
            size="medium"
            style={{ borderRadius: "8px", textTransform: "none" }}
          >
            {propertiesToFollow.length === 0 ? "Trouver" : "Rafraîchir"}
          </Button>
        </div>

        <PropertiesTable properties={propertiesToFollow} />
      </Card>
    </div>
  );
};

export default Portfolio;
