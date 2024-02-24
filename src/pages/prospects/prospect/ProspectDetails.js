import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Card from 'pages/components/Card';
import PropertiesTable from 'pages/properties/PropertiesTable.js';

const ProspectDetails = ({prospect, load}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(null);
  const [propertiesToFollow, setPropertiesToFollow] = useState([]);

  //fetchPropertiesToFollowDataFromBuyerId
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertiesToFollowDataFromBuyerId();
  }, []);

  const resetAndFindPropertiesToFollow = async () => {
    const userConfirmed = window.confirm("Veuillez noter que, pour l'instant, cette fonctionnalité entraînera la mise à jour des biens correspondants et réinitialisera les statuts à blabla. Souhaitez-vous poursuivre?");

    if (userConfirmed) {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}/properties-to-follow`;
        await fetch(url, {
          method: 'PUT',
        });

        window.location.reload();
      } catch (error) {
        console.error("Une erreur s'est produite lors de la réinitialisation des propriétés à suivre :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div className="buyer-details">
      <div className="cards-container">
        <div className="cards">
          <Card>
          <div style={prospectDetailsStyle}>
            <p>
              <span style={prospectFieldStyle}>ID:</span>
              <span>{prospect.id}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Title:</span>
              <span>{prospect.prospect?.title}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Last Name:</span>
              <span>{prospect.lastName}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>First Name:</span>
              <span>{prospect.firstName}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Date de naissance:</span>
              <span>{prospect.dateOfBirth}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Profession:</span>
              <span>{prospect.profession}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Mobile:</span>
              <span>{prospect.mobile}</span>
            </p>

            <p>
              <span style={prospectFieldStyle}>Mail:</span>
              <span>{prospect.email}</span>
            </p>
          </div>
            </Card>
        </div>
        <div className="find-properties">
          <Card>
            <p><strong>Portfolio properties to follow :</strong></p>
            <button onClick={resetAndFindPropertiesToFollow}>Find</button>
            <PropertiesTable properties={propertiesToFollow}/>
          </Card>
        </div>
      </div>
    </div>
  );
};

const prospectDetailsStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  fontFamily: 'Nunito, sans-serif',
  color: '#555',
  marginBottom: '8px',
};

const prospectFieldStyle = {
  fontWeight: 'bold', // Texte en gras pour les noms des champs
  color: '#333', // Couleur légèrement plus foncée pour les noms des champs
  marginRight: '8px',
};

export default ProspectDetails;