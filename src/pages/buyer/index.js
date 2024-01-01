import { useParams,useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Buyer = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertiesToFollow, setPropertiesToFollow] = useState([]);


  //fetchBuyerDataFromBuyerId
  useEffect(() => {
    const fetchBuyerDataFromBuyerId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBuyer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerDataFromBuyerId();
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
              <p>ID : {buyer.id}</p>
              <p>Title : {buyer.prospect?.title}</p>
              <p>Last Name : {buyer.prospect?.lastName}</p>
              <p>First Name : {buyer.prospect?.firstName}</p>
              <p>Date de naissance : {buyer.prospect?.dateOfBirth}</p>
              <p>Profession : {buyer.prospect?.profession}</p>
              <p>Mobile : {buyer.prospect?.mobile}</p>
              <p>Mail : {buyer.prospect?.mail}</p>
            </Card>
            <Card>
              <p>Statut : {buyer.status}</p>
              <p>Date debut recherche : {buyer.searchStartDate ? format(new Date(buyer.searchStartDate), 'yyyy-MM-dd') : 'N/A'}</p>
              <p>Date fin recherche : {buyer.searchEndDate ? format(new Date(buyer.searchEndDate), 'yyyy-MM-dd') : 'N/A'}</p>
            </Card>
            <Card>
              <p>Property criteria - Rooms Number: {buyer.propertyCriteria?.roomsNumber}</p>
              <p>Property criteria - Minimum Surface: {buyer.propertyCriteria?.minimumSurface}</p>
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
          <TableCell header>Property Name</TableCell>
          <TableCell header>Description</TableCell>
          <TableCell header>Rooms Number</TableCell>
          <TableCell header>Livable Area</TableCell>
          <TableCell header>Status</TableCell>
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


const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
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

export default Buyer;
