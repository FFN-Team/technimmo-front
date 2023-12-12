import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const url = `http://localhost:9001/api/v1/properties/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [id]);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="property-details">
        <Card>
            <p>ID : {property.id}</p>
            <p>Nom Bien : {property.nomBien}</p>
            <p>Description : {property.description}</p>
            <p>Nombre pièces : {property.nbPiece}</p>
            <p>Surface habitable : {property.surfaceHabitable}</p>
        </Card>
    </div>
  );
};

const Card = ({ children }) => (
  <div style={cardStyle}>
    {children}
  </div>
);

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

export default Property;