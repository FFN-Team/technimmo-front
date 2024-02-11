import { useParams,useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Prospect = () => {
  const { id } = useParams();
  const [prospect, setProspect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertiesToFollow, setPropertiesToFollow] = useState([]);


  //fetchBuyerDataFromBuyerId
  useEffect(() => {
    const fetchProspectDataFromProspectId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/prospects/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProspect(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProspectDataFromProspectId();
  }, [id]);

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


const PropertiesTable = ({ properties }) => {
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleStatusChange = async (event, propertyId) => {
    const userConfirmed = window.confirm("Vous allez changer de status. Souhaitez-vous poursuivre?");

    if (userConfirmed) {
      const newStatus = event.target.value;

      try {
        const url = `http://localhost:9001/api/v1/properties-to-follow/${propertyId}/status`;

        await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyToFollowStatus: newStatus,
          }),
        });

        window.location.reload();
      } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour du statut :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
    event.target.value = "DEFAUT";
  };


  return (
    properties && Array.isArray(properties) && (
      <Table>
        <TableHeader>
          <TableCell header>Nom de Propriété</TableCell>
          <TableCell header>Description</TableCell>
          <TableCell header>Nombre de pièces</TableCell>
          <TableCell header>Surface habitable</TableCell>
          <TableCell header>Statut</TableCell>
        </TableHeader>
        <tbody>
          {properties.map((property) => (
            <TableRow key={property.property.id} propertyId={property.property.id}>
              <TableCell onClick={() => handlePropertyClick(property.property.id)}>
                <div style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  {property.property.propertyName}
                </div>
              </TableCell>
              <TableCell>{property.property.description}</TableCell>
              <TableCell>{property.property.roomsNumber}</TableCell>
              <TableCell>{property.property.livableArea} sq. m</TableCell>
              <TableCell>
                <select
                  onChange={(event) => handleStatusChange(event, property.id)}
                >
                  <option 
                    value="DEFAUT"
                    style={{                    
                      backgroundColor: 'green',
                    }}  
                  >
                    {property.status}
                  </option>
                  <option value="TO_STUDY">TO_STUDY</option>
                  <option value="TO_VISITED">TO_VISITED</option>
                  <option value="VISITED">VISITED</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    )
  );
};

const Table = ({ children }) => (
  <table style={tableStyle}>
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead>
    <tr>
      {children}
    </tr>
  </thead>
);

const TableCell = ({ header, children, onClick }) => (
  header ? (
    <th style={tableHeaderStyle}>{children}</th>
  ) : (
    <td style={tableCellStyle} onClick={onClick}>{children}</td>
  )
);

const TableRow = ({ children }) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

const Card = ({ children }) => (
  <div style={cardStyle}>
    {children}
  </div>
);

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

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  margin: '10px',
  backgroundColor: '#ffffff',
  transition: 'box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
};

const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  width: '100%',
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default Prospect;